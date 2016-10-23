import { exiftool } from './exiftool'
import { expect } from 'chai'
import * as _path from 'path'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('ExifTool', () => {
  it('returns the correct version', () => {
    return expect(exiftool.version()).to.become('10.30')
  })
  it('returns error for missing file', () => {
    return expect(exiftool.read('bogus')).to.eventually.be.rejectedWith(/File not found/)
  })
  it('returns expected results for a given file', () => {
    const img = _path.join(__dirname, '..', 'test', 'img.jpg')
    return expect(exiftool.read(img).then(tags => tags.Model)).to.eventually.eql('iPhone 7 Plus')
  })
})
