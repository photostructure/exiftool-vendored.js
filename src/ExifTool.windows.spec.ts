import { once } from "node:events";
import { join } from "node:path";
import process from "node:process";
import { text } from "node:stream/consumers";
import { ExifTool } from "./ExifTool";
import { isWin32 } from "./IsWin32";
import { expect } from "./_chai.spec";

describe("ExifTool Windows process startup", () => {
  it("hides the default process factory's window", async function () {
    if (!isWin32()) return this.skip();

    // PowerShell startup and Add-Type compilation took 29.94s on a Windows
    // CI runner, exceeding the suite's 30s deadline on other runners.
    this.timeout(120_000);

    const script = `
Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
public static class StartupInfoProbe {
  [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
  public struct STARTUPINFO {
    public uint cb;
    public IntPtr lpReserved, lpDesktop, lpTitle;
    public uint dwX, dwY, dwXSize, dwYSize;
    public uint dwXCountChars, dwYCountChars, dwFillAttribute, dwFlags;
    public ushort wShowWindow, cbReserved2;
    public IntPtr lpReserved2, hStdInput, hStdOutput, hStdError;
  }
  [DllImport("kernel32.dll", CharSet = CharSet.Unicode)]
  private static extern void GetStartupInfo(ref STARTUPINFO info);
  public static string Current() {
    var info = new STARTUPINFO();
    info.cb = (uint)Marshal.SizeOf(typeof(STARTUPINFO));
    GetStartupInfo(ref info);
    return info.dwFlags + "," + info.wShowWindow;
  }
}
'@
[StartupInfoProbe]::Current()
`;
    // Run a real Windows executable through the default factory so the test
    // checks the OS startup flags, not a mocked child_process options object.
    const et = new ExifTool({
      exiftoolPath: join(
        process.env.SystemRoot ?? "C:\\Windows",
        "System32",
        "WindowsPowerShell",
        "v1.0",
        "powershell.exe",
      ),
      exiftoolArgs: [
        "-NoLogo",
        "-NoProfile",
        "-NonInteractive",
        "-EncodedCommand",
        Buffer.from(script, "utf16le").toString("base64"),
      ],
    });
    const child = await et.options.processFactory();
    try {
      const [stdout, stderr, [code]] = await Promise.all([
        text(child.stdout!),
        text(child.stderr!),
        // Abort before Mocha's deadline so finally can kill a stuck probe.
        once(child, "close", { signal: AbortSignal.timeout(90_000) }),
      ]);
      expect(code, stderr).to.eql(0);
      const [flags, showWindow] = stdout.trim().split(",").map(Number);
      expect(flags! & 1).to.eql(1); // STARTF_USESHOWWINDOW
      expect(showWindow).to.eql(0); // SW_HIDE
    } finally {
      if (child.exitCode == null) child.kill();
      await et.end();
    }
  });
});
