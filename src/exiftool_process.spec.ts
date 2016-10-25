import { ExifToolProcess } from './exiftool_process'
import { expect } from 'chai'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('ExifToolProcess', () => {
  it('ends properly', () => {
    const etp = new ExifToolProcess(() => undefined)
    etp.end()
    expect(etp.ended).to.eql(true)
    return expect(etp.closedPromise.then(() => etp.closed)).to.become(true)
  })
})
