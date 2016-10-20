import { ExifToolProcess } from './exiftool_process'
import { expect } from 'chai'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

function delay<T>(millis: number, value?: T): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve(value), 100))
}

describe('ExifToolProcess', () => {
  it('ends properly', () => {
    const etp = new ExifToolProcess()
    etp.end()
    return expect(delay(300).then(() => etp.ended)).to.become(true)
  })
})
