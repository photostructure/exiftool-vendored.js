import {ExifDate, ExifTime, ExifDateTime} from './datetime'
/**
 * Please note that this is not an exhaustive tag list.
 * PRs adding missing tags are welcome.
 */
export interface Metadata
  extends FileMetadata, JFIFMetadata, GPSInfoMetadata, EXIFMetadata, ICCProfile, MakerNotesMetadata, CompositeMetadata {
  SourceFile: string
  warnings: string[]
}

export interface GroupedMetadata {
  SourceFile: string
  File: FileMetadata
  JFIF: JFIFMetadata
  EXIF: EXIFMetadata
  MakerNotes: MakerNotesMetadata
  Composite: CompositeMetadata
}

export interface FileMetadata {
  BitsPerSample: number
  ColorComponents: number
  Directory: string
  EncodingProcess: string
  ExifByteOrder: string
  FileAccessDate: ExifDateTime
  FileInodeChangeDate: ExifDateTime
  FileModifyDate: ExifDateTime
  FileName: string
  FilePermissions: string
  FileSize: string
  FileType: string
  FileTypeExtension: string
  ImageHeight: number
  ImageWidth: number
  MIMEType: string
  YCbCrSubSampling: string
}

export interface JFIFMetadata {
  JFIFVersion: string
  ResolutionUnit: string
  XResolution: number
  YResolution: number
}

export interface GPSInfoMetadata {
  GPSAltitude: string // 73 m
  GPSAltitudeRef: string // Above Sea Level
  GPSDateTimeUTC: Date // UTC-encoded Date and Time
  GPSDateStamp: ExifDate // 2016:08:12
  GPSDestBearing: number // 31.18004866
  GPSDestBearingRef: string // True North
  GPSHPositioningError: string // 16 m
  GPSImgDirection: number // 31.18004866
  GPSImgDirectionRef: string // True North
  GPSLatitude: number // 32.33543889
  GPSLatitudeRef: string // North
  GPSLongitude: number // 100.16401667
  GPSLongitudeRef: string // East
  GPSSpeed: number // 0.487198608
  GPSSpeedRef: string // km/h
  GPSTimeStamp: ExifTime // 05:28:49
  GPSVersionID: string

  GPSSatellites: string
  GPSStatus: string
  GPSMeasureMode: string
  GPSDOP: number
  GPSTrackRef: string
  GPSTrack: number
  GPSMapDatum: string
  GPSDestLatitudeRef: string
  GPSDestLatitude: number
  GPSDestLongitudeRef: string
  GPSDestLongitude: number
  GPSDestDistanceRef: string
  GPSDestDistance: number
  GPSProcessingMethod: string
  GPSAreaInformation: string
}

export interface EXIFMetadata {
  ApertureValue: number
  Artist: string
  BrightnessValue: number
  ColorSpace: string
  ComponentsConfiguration: string
  Compression: string
  Contrast: string
  Copyright: string
  CreateDate: ExifDateTime
  CustomRendered: string
  DateTimeOriginal: ExifDateTime
  DigitalZoomRatio: number
  ExifImageHeight: number
  ExifImageWidth: number
  ExifVersion: string
  ExposureCompensation: string
  ExposureMode: string
  ExposureProgram: string
  ExposureTime: number
  FileSource: string
  Flash: string
  FlashpixVersion: string
  FNumber: number
  FocalLength: string
  FocalLengthIn35mmFormat: string
  GainControl: string
  ImageDescription: string
  InteropIndex: string
  InteropVersion: string
  ISO: number
  LensInfo: string
  LensModel: string
  LightSource: string
  Make: string
  MaxApertureValue: number
  MeteringMode: string
  Model: string
  ModifyDate: ExifDateTime
  Orientation: string
  ResolutionUnit: string
  Saturation: string
  SceneCaptureType: string
  SceneType: string
  SensingMethod: string
  SensitivityType: string
  Sharpness: string
  ShutterSpeedValue: string
  Software: string
  SubSecTime: number
  SubSecTimeDigitized: number
  SubSecTimeOriginal: number
  ThumbnailLength: number
  ThumbnailOffset: number
  UserComment: string
  WhiteBalance: string
  XResolution: number
  YCbCrPositioning: string
  YResolution: number
}

export interface ICCProfile {
  BlueMatrixColumn: string
  BlueTRC: string
  ChromaticAdaptation: string
  CMMFlags: string
  ColorSpaceData: string
  ConnectionSpaceIlluminant: string
  DeviceAttributes: string
  DeviceManufacturer: string
  DeviceModel: string
  DeviceModelDesc: string
  GreenMatrixColumn: string
  GreenTRC: string
  Luminance: string
  MeasurementBacking: string
  MeasurementFlare: string
  MeasurementGeometry: string
  MeasurementIlluminant: string
  MeasurementObserver: string
  MediaBlackPoint: string
  MediaWhitePoint: string
  PrimaryPlatform: string
  ProfileClass: string
  ProfileCMMType: string
  ProfileConnectionSpace: string
  ProfileCopyright: string
  ProfileCreator: string
  ProfileDateTime: ExifDateTime
  ProfileDescription: string
  ProfileFileSignature: string
  ProfileID: string
  ProfileVersion: string
  RedMatrixColumn: string
  RedTRC: string
  RenderingIntent: string
  Technology: string
  ViewingCondDesc: string
}

export interface MakerNotesMetadata {
  AELock: string
  AFAreas: string
  AFFineTune: string
  AFFineTuneAdj: string
  AFPoint: string
  AFPointSelected: string
  AFSearch: string
  ArtFilter: string
  ArtFilterEffect: string
  AspectFrame: string
  AspectRatio: string
  BlackLevel2: string
  BodyFirmwareVersion: number
  CameraID: string
  CameraSettingsVersion: string
  CameraTemperature: number
  CameraType2: string
  ColorMatrix: string
  ColorSpace: string
  CompressionFactor: number
  ContrastSetting: string
  ConversionLens: string
  CropHeight: number
  CropLeft: string
  CropTop: string
  CropWidth: number
  CustomSaturation: string
  DateTimeUTC: Date // rare tag only on some Olympus cameras
  DistortionCorrection: string
  DistortionCorrection2: string
  DriveMode: string
  EquipmentVersion: string
  ExposureMode: string
  ExposureShift: number
  ExtendedWBDetect: string
  Extender: string
  ExtenderFirmwareVersion: number
  ExtenderModel: string
  ExtenderSerialNumber: string
  ExternalFlash: string
  ExternalFlashBounce: string
  ExternalFlashZoom: number
  FaceDetectArea: string
  FaceDetectFrameCrop: string
  FaceDetectFrameSize: string
  FacesDetected: string
  FlashControlMode: string
  FlashExposureComp: number
  FlashFirmwareVersion: number
  FlashIntensity: string
  FlashMode: string
  FlashModel: string
  FlashRemoteControl: string
  FlashSerialNumber: string
  FlashType: string
  FocalPlaneDiagonal: string
  FocusDistance: string
  FocusInfoVersion: string
  FocusMode: string
  FocusProcess: string
  FocusStepCount: number
  FocusStepInfinity: number
  FocusStepNear: number
  GainBase: number
  Gradation: string
  ImageProcessingVersion: string
  ImageStabilization: string
  InternalFlash: string
  InternalSerialNumber: string
  LensFirmwareVersion: number
  LensModel: string
  LensProperties: string
  LensSerialNumber: string
  LensType: string
  MacroLED: string
  MacroMode: string
  ManometerPressure: string
  ManometerReading: string
  ManualFlash: string
  ManualFlashStrength: string
  MaxAperture: number
  MaxApertureAtMaxFocal: number
  MaxApertureAtMinFocal: number
  MaxFaces: string
  MaxFocalLength: number
  MeteringMode: string
  MinFocalLength: number
  ModifiedSaturation: string
  MultipleExposureMode: string
  NoiseFilter: string
  NoiseReduction: string
  NoiseReduction2: string
  PanoramaMode: string
  PictureMode: string
  PictureModeBWFilter: string
  PictureModeContrast: string
  PictureModeEffect: string
  PictureModeSaturation: string
  PictureModeSharpness: string
  PictureModeTone: string
  PreviewImageLength: number
  PreviewImageStart: number
  PreviewImageValid: string
  RawDevColorSpace: string
  RawDevContrastValue: string
  RawDevEditStatus: string
  RawDevEngine: string
  RawDevExposureBiasValue: number
  RawDevGrayPoint: string
  RawDevMemoryColorEmphasis: number
  RawDevNoiseReduction: string
  RawDevSaturationEmphasis: string
  RawDevSettings: string
  RawDevSharpnessValue: string
  RawDevVersion: string
  RawDevWBFineAdjustment: number
  RawDevWhiteBalanceValue: number
  SceneDetect: number
  SceneMode: string
  SensorCalibration: string
  SensorTemperature: string
  SerialNumber: string
  ShadingCompensation: string
  ShadingCompensation2: string
  SharpnessSetting: string
  SpecialMode: string
  StackedImage: string
  ToneLevel: string
  WB_RBLevels: string
  WhiteBalance2: string
  WhiteBalanceBracket: string
  WhiteBalanceTemperature: number
  ZoomStepCount: number
}

export interface CompositeMetadata {
  Aperture: number
  BlueBalance: number
  ExtenderStatus: string
  ImageSize: string
  LensID: string
  Megapixels: number
  PreviewImage: string
  RedBalance: number
  ScaleFactor35efl: number
  ShutterSpeed: number
  ThumbnailImage: string
  CircleOfConfusion: string
  DOF: string
  FOV: string
  FocalLength35efl: string
  HyperfocalDistance: string
  LightValue: number
}
