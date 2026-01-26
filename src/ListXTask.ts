import { ExifToolTask, ExifToolTaskOptions } from "./ExifToolTask";

/**
 * Task for retrieving the ExifTool tag information in XML format.
 * This runs `exiftool -listx` and returns the raw XML output.
 */
export class ListXTask extends ExifToolTask<string> {
  /**
   * @param options task options
   */
  constructor(options?: ExifToolTaskOptions) {
    // -listx outputs XML tag information
    super(["-listx"], options);
  }

  protected parse(input: string): string {
    // Return raw XML - parsing is handled by TagDescriptions
    return input;
  }
}
