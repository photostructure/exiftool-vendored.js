import { uniq } from "./Array"
import { ExifToolTask } from "./ExifToolTask"
import { compactBlanks } from "./String"

export interface ErrorsAndWarnings {
  /**
   * This is a list of all critical errors raised by ExifTool during the read
   * process.
   */
  errors?: string[]
  /**
   * This is a list of all non-critical errors raised by ExifTool during the
   * read process.
   *
   * Invalid field values are considered warnings and not errors, for example.
   */
  warnings?: string[]
}

export function errorsAndWarnings(
  task: ExifToolTask<any>,
  t?: { Error?: string; Warning?: string }
): Required<ErrorsAndWarnings> {
  return {
    errors: uniq(compactBlanks([t?.Error, ...task.errors])),
    warnings: uniq(compactBlanks([t?.Warning, ...task.warnings])),
  }
}
