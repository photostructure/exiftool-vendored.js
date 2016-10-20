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
  xit('returns proper results for the proper files', () => {
    // TODO
  })
})
