/**
 * Subset of <https://exiftool.org/TagNames/ICC_Profile.html>.
 *
 * None of these tags are writable.
 */
export interface ICCProfileTags {
  /** ☆☆☆☆ ✔ Example: "RGB " */
  ColorSpaceData?: string
  /** ☆☆☆☆ ✔ Example: "0.9642 1 0.82491" */
  ConnectionSpaceIlluminant?: string
  /** ☆☆☆☆ ✔ Example: "Reflective, Glossy, Positive, Color" */
  DeviceAttributes?: string
  /** ☆☆☆☆ ✔ Example: "none" */
  DeviceManufacturer?: string
  /** ☆☆☆☆ ✔ Example: "IEC http://www.iec.ch" */
  DeviceMfgDesc?: string
  /** ☆☆☆☆ ✔ Example: "sRGB" */
  DeviceModel?: string
  /** ☆☆☆☆ ✔ Example: "sRGB v1.31 (Canon)" */
  DeviceModelDesc?: string
  /** ☆☆☆☆ ✔ Example: "76.03647 80 87.12462" */
  Luminance?: string
  /** ☆☆☆☆ ✔ Example: "sRGB v1.31 (Canon)" */
  ProfileDescription?: string
}
