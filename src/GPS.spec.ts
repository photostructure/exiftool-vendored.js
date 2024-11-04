import { expect } from "./_chai.spec"
import { GpsLocationTags, parseGPSLocation } from "./GPS"
describe("parseGPSLocation", () => {
  const defaultOpts = { ignoreZeroZeroLatLon: false }

  it("should return empty object when no GPS data present", () => {
    const result = parseGPSLocation({} as GpsLocationTags, defaultOpts)
    expect(result).to.eql({})
  })

  it("should ignore zero coordinates when ignoreZeroZeroLatLon is true", () => {
    const tags: GpsLocationTags = {
      GPSLatitude: 0,
      GPSLongitude: 0,
    }
    const result = parseGPSLocation(tags, { ignoreZeroZeroLatLon: true })
    expect(result.invalid).to.eql(true)
    expect(result.warnings).to.include(
      "Ignoring zero GPSLatitude and GPSLongitude"
    )
  })

  it("should process valid coordinates correctly", () => {
    const tags: GpsLocationTags = {
      GPSLatitude: 40.7128,
      GPSLatitudeRef: "N",
      GPSLongitude: 74.006,
      GPSLongitudeRef: "W",
    }
    const result = parseGPSLocation(tags, defaultOpts)
    expect(result.invalid).to.eql(false)
    expect(result.result?.GPSLatitude).to.eql(40.7128)
    expect(result.result?.GPSLongitude).to.eql(-74.006)
  })

  it("should handle out of range coordinates", () => {
    const tags: GpsLocationTags = {
      GPSLatitude: 91,
      GPSLongitude: 181,
    }
    const result = parseGPSLocation(tags, defaultOpts)
    expect(result.invalid).to.eql(true)
    expect(result.warnings).to.include(
      "Invalid GPSLatitude: 91 is out of range"
    )
    expect(result.warnings).to.include(
      "Invalid GPSLongitude: 181 is out of range"
    )
  })

  describe("GeolocationPosition hemisphere handling", () => {
    it("should handle Northeast hemisphere coordinates", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 35.6762,
        GPSLongitude: 139.6503,
        GeolocationPosition: "35.6762,139.6503", // Tokyo
      }
      const result = parseGPSLocation(tags, defaultOpts)
      expect(result.result?.GPSLatitude).to.eql(35.6762)
      expect(result.result?.GPSLongitude).to.eql(139.6503)
      expect(result.result?.GPSLatitudeRef).to.eql("N")
      expect(result.result?.GPSLongitudeRef).to.eql("E")
      expect(result.invalid).to.eql(false)
    })

    it("should handle Northwest hemisphere coordinates", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 40.7128,
        GPSLongitude: -74.006, // Fixed: Input longitude should be negative
        GeolocationPosition: "40.7128,-74.0060", // New York
      }
      const result = parseGPSLocation(tags, defaultOpts)
      expect(result.result?.GPSLatitude).to.eql(40.7128)
      expect(result.result?.GPSLongitude).to.eql(-74.006)
      expect(result.result?.GPSLatitudeRef).to.eql("N")
      expect(result.result?.GPSLongitudeRef).to.eql("W")
      expect(result.invalid).to.eql(false)
    })

    it("should handle Southeast hemisphere coordinates", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 33.8688,
        GPSLongitude: 151.2093,
        GeolocationPosition: "-33.8688,151.2093", // Sydney
      }
      const result = parseGPSLocation(tags, defaultOpts)
      expect(result.result?.GPSLatitude).to.eql(-33.8688)
      expect(result.result?.GPSLongitude).to.eql(151.2093)
      expect(result.result?.GPSLatitudeRef).to.eql("S")
      expect(result.result?.GPSLongitudeRef).to.eql("E")
      expect(result.invalid).to.eql(false)
    })

    it("should handle Southwest hemisphere coordinates", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 33.9249,
        GPSLongitude: 70.9264,
        GeolocationPosition: "-33.9249,-70.9264", // Santiago
      }
      const result = parseGPSLocation(tags, defaultOpts)
      expect(result.result?.GPSLatitude).to.eql(-33.9249)
      expect(result.result?.GPSLongitude).to.eql(-70.9264)
      expect(result.result?.GPSLatitudeRef).to.eql("S")
      expect(result.result?.GPSLongitudeRef).to.eql("W")
      expect(result.invalid).to.eql(false)
    })

    it("should correct mismatched signs with GeolocationPosition", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 33.9249, // Wrong sign
        GPSLongitude: 70.9264, // Wrong sign
        GPSLatitudeRef: "N", // Wrong ref
        GPSLongitudeRef: "E", // Wrong ref
        GeolocationPosition: "-33.9249,-70.9264", // Santiago (correct)
      }
      const result = parseGPSLocation(tags, defaultOpts)
      expect(result.result?.GPSLatitude).to.eql(-33.9249)
      expect(result.result?.GPSLongitude).to.eql(-70.9264)
      expect(result.result?.GPSLatitudeRef).to.eql("S")
      expect(result.result?.GPSLongitudeRef).to.eql("W")
      expect(result.warnings).to.include(
        "Corrected GPSLatitude sign based on GeolocationPosition"
      )
      expect(result.warnings).to.include(
        "Corrected GPSLongitude sign based on GeolocationPosition"
      )
      expect(result.warnings).to.include(
        "Corrected GPSLatitudeRef to S based on GeolocationPosition"
      )
      expect(result.warnings).to.include(
        "Corrected GPSLongitudeRef to W based on GeolocationPosition"
      )
      expect(result.invalid).to.eql(false)
    })

    it("should correct wrong signs in Northwest hemisphere", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 40.7128,
        GPSLongitude: 74.006, // Wrong sign (positive instead of negative)
        GeolocationPosition: "40.7128,-74.0060", // New York (correct)
      }
      const result = parseGPSLocation(tags, defaultOpts)
      expect(result.result?.GPSLatitude).to.eql(40.7128)
      expect(result.result?.GPSLongitude).to.eql(-74.006)
      expect(result.result?.GPSLatitudeRef).to.eql("N")
      expect(result.result?.GPSLongitudeRef).to.eql("W")
      expect(result.warnings).to.include(
        "Corrected GPSLongitude sign based on GeolocationPosition"
      )
      expect(result.invalid).to.eql(false)
    })

    it("should handle coordinates near the equator and prime meridian", () => {
      const tags: GpsLocationTags = {
        GPSLatitude: 0.3476,
        GPSLongitude: 0.2345,
        GeolocationPosition: "0.3476,0.2345", // Near 0,0
      }
      const result = parseGPSLocation(tags, defaultOpts)
      expect(result.result?.GPSLatitude).to.eql(0.3476)
      expect(result.result?.GPSLongitude).to.eql(0.2345)
      expect(result.result?.GPSLatitudeRef).to.eql("N")
      expect(result.result?.GPSLongitudeRef).to.eql("E")
      expect(result.invalid).to.eql(false)
    })
  })

  it("should handle mismatched ref and coordinate signs", () => {
    const tags: GpsLocationTags = {
      GPSLatitude: -40.7128,
      GPSLatitudeRef: "N",
      GPSLongitude: -74.006,
      GPSLongitudeRef: "E",
    }
    const result = parseGPSLocation(tags, defaultOpts)
    expect(result.result?.GPSLatitudeRef).to.eql("S")
    expect(result.result?.GPSLongitudeRef).to.eql("W")
    expect(result.warnings?.length).to.eql(2)
  })

  it("should handle missing ref values", () => {
    const tags: GpsLocationTags = {
      GPSLatitude: 40.7128,
      GPSLongitude: -74.006,
    }
    const result = parseGPSLocation(tags, defaultOpts)
    expect(result.result?.GPSLatitudeRef).to.eql("N")
    expect(result.result?.GPSLongitudeRef).to.eql("W")
  })
})
