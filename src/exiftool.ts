import { ExifToolProcess } from './exiftool_process'
import { Tags } from './tags'
export { Tags } from './tags'

export interface ExifToolAPI {
  version: Promise<string>
  read(file: string): Promise<Tags>

  // For internal use, returns keys prefixed by the group name  
  readGrouped(file: string): Promise<any>
  /**
   * This will be called automatically at by process.beforeExit,
   * but tests may need to call this proactively.
   */
  end(): void
}

/**
 * This is the version of the `exiftool-vendored` npm module.
 * The package.json value is made to match this value by `npm run update`. 
 */
export const ExifToolVendoredVersion = '0.1.0'

/**
 * Manages delegating calls to a vendored running instance of ExifTool.
 *
 * Instantiation is expensive: use the exported singleton instance of this class, `exiftool`.
 */
class ExifTool implements ExifToolAPI {
  private _proc = new ExifToolProcess()

  /**
   * @return a Promise to the vendored ExifTool's version 
   */
  get version(): Promise<string> {
    return this.proc().version
  }

  read(file: string, retries: number = 1): Promise<Tags> {
    return this.proc().read(file).catch(err => {
      if (retries > 0) {
        console.error(`ExifTool: failed to read ${file}: ${err}. Retrying.`)
        return this.read(file, retries - 1)
      } else {
        throw err
      }
    })
  }

  // For internal use, returns keys prefixed by the group name  
  readGrouped(file: string): Promise<any> {
    return this.proc().readGrouped(file)
  }

  end() {
    this._proc.end()
  }

  private proc(): ExifToolProcess {
    if (this._proc.ended) {
      this._proc = new ExifToolProcess()
      return this.proc()
    } else {
      return this._proc
    }
  }
}

/**
 * Use this singleton rather than instantiating new ExifTool instances
 * in order to leverage a single running ExifTool process.
 */
export const exiftool: ExifToolAPI = new ExifTool()
