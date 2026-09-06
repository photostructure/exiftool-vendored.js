import { expect } from "./_chai.spec";
import { errorsAndWarnings } from "./ErrorsAndWarnings";
import { ExifToolTask } from "./ExifToolTask";

function fakeTask(args?: {
  errors?: string[];
  warnings?: string[];
}): ExifToolTask<unknown> {
  return {
    errors: args?.errors ?? [],
    warnings: args?.warnings ?? [],
  } as unknown as ExifToolTask<unknown>;
}

describe("ErrorsAndWarnings", () => {
  it("returns empty arrays for an empty task", () => {
    expect(errorsAndWarnings(fakeTask())).to.eql({
      errors: [],
      warnings: [],
    });
  });

  it("reads bare Error and Warning fields", () => {
    expect(
      errorsAndWarnings(fakeTask(), { Error: "boom", Warning: "meh" }),
    ).to.eql({
      errors: ["boom"],
      warnings: ["meh"],
    });
  });

  it("reads ExifTool:Error and ExifTool:Warning fields (as emitted under -G)", () => {
    expect(
      errorsAndWarnings(fakeTask(), {
        "ExifTool:Error": "boom",
        "ExifTool:Warning": "meh",
      }),
    ).to.eql({
      errors: ["boom"],
      warnings: ["meh"],
    });
  });

  it("merges task errors with both bare and prefixed fields, dropping duplicates and blanks", () => {
    expect(
      errorsAndWarnings(
        fakeTask({ errors: ["boom", "stderr err"], warnings: [""] }),
        {
          Error: "boom",
          "ExifTool:Error": "prefixed boom",
          Warning: "meh",
          "ExifTool:Warning": "meh",
        },
      ),
    ).to.eql({
      errors: ["boom", "prefixed boom", "stderr err"],
      warnings: ["meh"],
    });
  });
});
