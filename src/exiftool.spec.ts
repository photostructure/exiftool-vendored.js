import { ExifTool } from './exiftool'
import { expect } from 'chai'
import * as _path from 'path'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('ExifTool', () => {
  const exiftool = new ExifTool(2)
  const truncated = _path.join(__dirname, '..', 'test', 'truncated.jpg')
  const noexif = _path.join(__dirname, '..', 'test', 'noexif.jpg')
  const img = _path.join(__dirname, '..', 'test', 'img.jpg')

  function runningProcs(): number {
    return exiftool['procs']().length
  }

  it('returns the correct version', () => {
    return expect(exiftool.version()).to.become('10.36')
  })

  it('returns expected results for a given file', () => {
    return expect(exiftool.read(img).then(tags => tags.Model)).to.eventually.eql('iPhone 7 Plus')
  })

  it('returns warning for a truncated file', () => {
    return expect(exiftool.read(truncated).then(tags => tags.Warning)).to.eventually.eql('JPEG format error')
  })

  function normalize(tagNames: string[]): string[] {
    return tagNames.filter(i => i !== 'FileInodeChangeDate' && i !== 'FileCreateDate').sort()
  }

  it('returns no exif metadata for an image with no headers', () => {
    return expect(exiftool.read(noexif).then(tags => normalize(Object.keys(tags)))).to.become(normalize([
      'BitsPerSample',
      'ColorComponents',
      'Directory',
      'EncodingProcess',
      'ExifToolVersion',
      'FileAccessDate',
      'FileModifyDate',
      'FileName',
      'FilePermissions',
      'FileSize',
      'FileType',
      'FileTypeExtension',
      'ImageHeight',
      'ImageSize',
      'ImageWidth',
      'Megapixels',
      'MIMEType',
      'SourceFile',
      'YCbCrSubSampling',
      'errors'
    ]))
  })

  it('returns error for missing file', () => {
    return expect(exiftool.read('bogus')).to.eventually.be.rejectedWith(/File not found/)
  })

  it('sets "Error" for unsupported file types', async () => {
    return expect((await exiftool.read(__filename)).Error).to.match(/Unknown file type/i)
  })

  it('ends with multiple procs', () => {
    const promises = [exiftool.read(img), exiftool.read(img)]
    expect(runningProcs()).to.eql(2)
    return expect(Promise.all(promises).then(() => exiftool.end()).then(() => runningProcs())).to.become(0)
  })
})
