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
    it('Renders a Date assuming the current timezone offset', () => {
      expect(dt.toDate().toLocaleString('en-US')).to.eql('8/12/2016, 7:28:50 AM')
    })
  })

  describe('example strings with tz', () => {
    const dt = new ExifDateTime('2013:12:30 11:04:15-05:00') // this is a non-local offset btw
    it('year/month/day', () => {
      expect([dt.year, dt.month, dt.day]).to.eql([2013, 12, 30])
    })
    it('hour/minute/second', () => {
      expect([dt.hour, dt.minute, dt.second]).to.eql([11, 4, 15])
    })
    it('tzoffset', () => {
      expect(dt.tzoffsetMinutes).to.eql(-60*5)
    })
    it('.toISOString', () => {
      expect(dt.toISOString()).to.eql('2013-12-30T11:04:15-05:00')
    })
    it('Renders a Date assuming the current timezone offset', () => {
      expect(dt.toDate().toLocaleString('en-US')).to.eql('12/31/2013, 11:04:15 AM')
    })
    it('Renders a UTC Date assuming the current timezone offset', () => {
      expect(dt.toDate().toISOString()).to.eql('2013-12-30T16:04:15.000Z')
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
