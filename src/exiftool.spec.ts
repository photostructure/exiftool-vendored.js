import { exiftool, ExifTool } from './exiftool'
import { expect } from 'chai'
import * as _path from 'path'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('ExifTool', () => {
  after(() => (exiftool as ExifTool).end())
  it('returns the correct version', () => {
    return expect(exiftool.version()).to.become('10.31')
  })
  it('returns error for missing file', () => {
    return expect(exiftool.read('bogus')).to.eventually.be.rejectedWith(/File not found/)
  })
  it('returns expected results for a given file', () => {
    const img = _path.join(__dirname, '..', 'test', 'img.jpg')
    return expect(exiftool.read(img).then(tags => tags.Model)).to.eventually.eql('iPhone 7 Plus')
  })
  it('returns warning for a truncated file', () => {
    const img = _path.join(__dirname, '..', 'test', 'truncated.jpg')
    return expect(exiftool.read(img).then(tags => tags.Warning)).to.eventually.eql('JPEG format error')
  })
  it('returns no exif metadata for an image with no headers', () => {
    const img = _path.join(__dirname, '..', 'test', 'noexif.jpg')
    return expect(exiftool.read(img).then(tags => Object.keys(tags).sort())).to.become([
      'BitsPerSample',
      'ColorComponents',
      'Directory',
      'EncodingProcess',
      'ExifToolVersion',
      'FileAccessDate',
      'FileCreateDate',
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
    ].sort())
  })
})
