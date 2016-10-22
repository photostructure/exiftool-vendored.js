import { exiftool } from './exiftool'
import { expect } from 'chai'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('ExifTool', () => {
  after(() => exiftool.end())
  it('returns the correct version', () => {
    return expect(exiftool.version).to.become('10.30')
  })
  it('returns error for missing file', () => {
    return expect(exiftool.read('bogus').then(tags => tags.errors[0])).to.eventually.include('File not found')
  })
  it('returns expected results for a given file', () => {
    return expect(exiftool.read('../test/img.jpg').then(tags => tags.Model)).to.eventually.eql('blurpo')
  })
})
