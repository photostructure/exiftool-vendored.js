import { TagsTask } from './tags_task'
import { Tags } from './tags'
import { expect } from 'chai'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('Lat/Lon parsing', () => {

  function parse(tags: any): Tags {
    const tt = TagsTask.for('/tmp/example.jpg')
    tags.SourceFile = '/tmp/example.jpg'
    const json = JSON.stringify([tags])
    return tt.parse(json)
  }
  /* Example:   
    $ exiftool -j -coordFormat '%.8f' -fast ../test-images/important/Apple_iPhone7Plus.jpg | grep itude
    "GPSLatitudeRef": "North",
    "GPSLongitudeRef": "East",
    "GPSAltitudeRef": "Above Sea Level",
    "GPSAltitude": "73 m Above Sea Level",
    "GPSLatitude": "22.33543889 N",
    "GPSLongitude": "114.16401667 E",
   */
  it('N lat is positive', () => {
    expect(parse({ GPSLatitude: '22.33543889 N' }).GPSLatitude).to.be.closeTo(22.33543889, 0.00001)
  })
  it('S lat is negative', () => {
    expect(parse({ GPSLatitude: '33.84842123 S' }).GPSLatitude).to.be.closeTo(-33.84842123, 0.00001)
  })
  it('E lon is positive', () => {
    expect(parse({ GPSLongitude: '114.16401667 E' }).GPSLongitude).to.be.closeTo(114.16401667, 0.00001)
  })
  it('W lon is negative', () => {
    expect(parse({ GPSLongitude: '122.4406148 W' }).GPSLongitude).to.be.closeTo(-122.4406148, 0.00001)
  })
})
