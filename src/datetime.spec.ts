import { ExifTime, ExifDate, ExifDateTime } from './datetime'
import { expect } from 'chai'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('ExifDateTime', () => {
  describe('example strings with no tz', () => {
    const dt = new ExifDateTime('2016:08:12 07:28:50')
    it('year/month/day', () => {
      expect([dt.year, dt.month, dt.day]).to.eql([2016, 8, 12])
    })
    it('hour/minute/second', () => {
      expect([dt.hour, dt.minute, dt.second]).to.eql([7, 28, 50])
    })
    it('.toISOString', () => {
      expect(dt.toISOString()).to.eql('2016-08-12T07:28:50')
    })
  })
})

describe('ExifTime', () => {
  const dt = new ExifTime('12:03:45')
  it('hour/minute/second', () => {
    expect([dt.hour, dt.minute, dt.second]).to.eql([12, 3, 45])
  })
})

describe('ExifDate', () => {
  const dt = new ExifDate('2016:09:10')
    it('year/month/day', () => {
      expect([dt.year, dt.month, dt.day]).to.eql([2016, 9, 10])
    })
})
