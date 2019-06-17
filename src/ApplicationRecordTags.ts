import { ExifDate } from "./ExifDate"
import { ExifDateTime } from "./ExifDateTime"
import { ExifTime } from "./ExifTime"

export interface ApplicationRecordTags {
  ApplicationRecordVersion?: number
  ObjectTypeReference?: string
  ObjectAttributeReference?: string
  ObjectName?: string
  EditStatus?: string
  EditorialUpDate?: ExifDateTime | ExifDate
  SubjectReference?: string
  Category?: string
  SupplementalCategories?: string
  FixtureIdentifier?: string
  ContentLocationCode?: string
  ContentLocationName?: string
  ReleaseDate?: ExifDateTime | ExifDate
  ReleaseTime?: ExifDateTime | ExifTime
  ExpirationDate?: ExifDateTime | ExifDate
  ExpirationTime?: string | ExifDateTime | ExifTime
  SpecialInstructions?: string
  ActionAdvised?: number
  ReferenceService?: string
  ReferenceDate?: ExifDateTime | ExifDate
  ReferenceNumber?: number
  OriginatingProgram?: string
  ProgramVersion?: string
  ObjectCycle?: string
  "By-line"?: string
  "By-lineTitle"?: string
  City?: string
  "Sub-location"?: string
  "Province-State"?: string
  "Country-PrimaryLocationCode"?: string
  "Country-PrimaryLocationName"?: string
  OriginalTransmissionReference?: string
  Headline?: string
  Credit?: string
  Source?: string
  CopyrightNotice?: string
  Contact?: string
  "Caption-Abstract"?: string
  LocalCaption?: string
  "Writer-Editor"?: string
  ImageType?: string
  /** 'L' = Landscape, 'P' = Portrait, 'S' = Square */
  ImageOrientation?: string
  LanguageIdentifier?: string
  AudioType?: string
  AudioSamplingRate?: number
  AudioSamplingResolution?: number
  AudioDuration?: number
  AudioOutcue?: string
  JobID?: string
  MasterDocumentID?: string
  ShortDocumentID?: string
  UniqueDocumentID?: string
  OwnerID?: string
  ObjectPreviewFileFormat?: number
  ObjectPreviewFileVersion?: number
  Prefs?: string
  ClassifyState?: string
  SimilarityIndex?: string
  DocumentNotes?: string
  DocumentHistory?: string
  ExifCameraInfo?: string
}
