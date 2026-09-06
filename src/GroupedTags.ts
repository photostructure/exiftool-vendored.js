import { ExifToolVendoredTags } from "./ExifToolVendoredTags";
import { GeolocationTags } from "./GeolocationTags";
import { GpsLocationTags } from "./GPS";
import { ICCProfileTags } from "./ICCProfileTags";
import { ImageDataHashTag } from "./ImageDataHashTag";
import { IPTCApplicationRecordTags } from "./IPTCApplicationRecordTags";
import { Maybe } from "./Maybe";
import { MWGCollectionsTags, MWGKeywordTags } from "./MWGTags";
import {
  CompositeTags,
  DuckyTags,
  EXIFTags,
  ExifToolTags,
  FileTags,
  FlashPixTags,
  IPTCTags,
  JFIFTags,
  JPEGTags,
  JSONTags,
  JUMBFTags,
  MakerNotesTags,
  MetaTags,
  MPFTags,
  PanasonicRawTags,
  PhotoshopTags,
  PrintIMTags,
  QuickTimeTags,
  RAFTags,
  RIFFTags,
  Tags,
  XMPTags,
} from "./Tags";

/**
 * Renames every key of `T` to `` `${Group}:${Key}` ``, mirroring ExifTool's
 * `-G` output (see {@link ExifToolOptions.groupNames}).
 */
export type PrefixedTags<Group extends string, T> = {
  [K in Extract<keyof T, string> as `${Group}:${K}`]?: T[K];
};

/**
 * The tags that this library synthesizes and always returns under bare
 * (unprefixed) keys, even when {@link ExifToolOptions.groupNames} is enabled:
 * everything from {@link ExifToolVendoredTags}, the `SourceFile`, and the
 * parsed, validated, sign-corrected GPS quartet.
 *
 * Everything else in {@link GroupedTags} is keyed by `Group:TagName`,
 * verbatim from ExifTool's `-G` output (except that the group-prefixed GPS
 * tags also carry the library's validated sign-corrected values, and all GPS
 * tags are omitted when the position is invalid).
 */
export interface UngroupedVendoredTags
  extends
    ExifToolVendoredTags,
    Pick<
      GpsLocationTags,
      "GPSLatitude" | "GPSLatitudeRef" | "GPSLongitude" | "GPSLongitudeRef"
    > {
  SourceFile?: string;
}

/**
 * The shape returned by {@link ExifTool.read} when
 * {@link ExifToolOptions.groupNames} is `true`: ExifTool's own tags are keyed
 * by their family-0 group, like `EXIF:Make` or `MakerNotes:MeteringMode`,
 * and library-synthesized tags stay bare (see
 * {@link UngroupedVendoredTags}).
 *
 * Like {@link Tags}, this interface is **not** comprehensive--ExifTool may
 * return tags (or whole groups) that are not listed here. `APP0`...`APP15`
 * segment tags (see `APPTags`) are only covered by the loosely-typed
 * `` `APP${AppSegmentIndex}:${string}` `` index signature below, because
 * one interface per APP segment group isn't worth the maintenance cost.
 *
 * @see https://exiftool.org/#GroupNames
 */
export interface GroupedTags
  extends
    UngroupedVendoredTags,
    PrefixedTags<"Composite", CompositeTags>,
    PrefixedTags<"Ducky", DuckyTags>,
    PrefixedTags<"EXIF", EXIFTags>,
    PrefixedTags<"ExifTool", Omit<ExifToolTags, "SourceFile">>,
    PrefixedTags<"ExifTool", GeolocationTags>,
    PrefixedTags<"File", FileTags>,
    // ImageDataHash comes from ExifTool's "Extra" table, whose family-0
    // group is "File" (verified against the vendored ExifTool 13.59):
    PrefixedTags<"File", ImageDataHashTag>,
    PrefixedTags<"FlashPix", FlashPixTags>,
    PrefixedTags<"ICC_Profile", ICCProfileTags>,
    PrefixedTags<"IPTC", IPTCApplicationRecordTags>,
    PrefixedTags<"IPTC", IPTCTags>,
    PrefixedTags<"JFIF", JFIFTags>,
    PrefixedTags<"JPEG", JPEGTags>,
    PrefixedTags<"JSON", JSONTags>,
    PrefixedTags<"JUMBF", JUMBFTags>,
    PrefixedTags<"MPF", MPFTags>,
    PrefixedTags<"MakerNotes", MakerNotesTags>,
    PrefixedTags<"Meta", MetaTags>,
    PrefixedTags<"PanasonicRaw", PanasonicRawTags>,
    PrefixedTags<"Photoshop", PhotoshopTags>,
    PrefixedTags<"PrintIM", PrintIMTags>,
    PrefixedTags<"QuickTime", QuickTimeTags>,
    PrefixedTags<"RAF", RAFTags>,
    PrefixedTags<"RIFF", RIFFTags>,
    PrefixedTags<"XMP", MWGCollectionsTags>,
    PrefixedTags<"XMP", MWGKeywordTags>,
    PrefixedTags<"XMP", XMPTags> {
  /**
   * Tags from JPEG `APP0`...`APP15` segments (see `APPTags` for the known
   * bare names). These groups hold a hodgepodge of vendor-specific tags, so
   * they are not individually typed.
   */
  [appSegmentTag: `APP${AppSegmentIndex}:${string}`]: unknown;
}

/**
 * The JPEG APP segment numbers: `APP0`...`APP15` are the only `APP*`
 * family-0 group names ExifTool emits.
 */
export type AppSegmentIndex =
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

/**
 * Look up a tag value by name, working with both bare {@link Tags} and
 * group-prefixed {@link GroupedTags} metadata objects:
 *
 * 1. An exact key match always wins.
 * 2. A group-prefixed `name` (like `"EXIF:Make"`) falls back to its bare
 *    name (`"Make"`), so prefixed lookups also work against bare-mode tags.
 *    Against a grouped read it will **not** match the same tag name from a
 *    *different* group. Note that against a *bare-mode* read, the fallback
 *    returns the bare merged value, whose original group is unknowable
 *    (ExifTool's internal priority picked it, and it may have come from a
 *    different group than the one you asked for).
 * 3. A bare `name` (like `"Make"`) falls back to scanning for any
 *    `Group:name` key. If several groups have the same tag name, the last
 *    one wins, matching the degrouped view that {@link ExifTool.read} uses
 *    for its timezone and video-detection heuristics.
 *
 * Because of those fallbacks, a name that exists in both the bare
 * {@link Tags} and {@link GroupedTags} namespaces is typed as the union of
 * both declarations (`GPSLatitude` is a validated `number` as a bare key of
 * a grouped read, but may be a raw string in bare mode or via the degrouped
 * fallback).
 *
 * @return the tag value, or `undefined` if the tag is missing or `tags` is
 * nullish.
 */
export function tag<K extends Extract<keyof GroupedTags, string>>(
  tags: Maybe<Tags | GroupedTags>,
  name: K,
): GroupedTags[K] | (K extends keyof Tags ? Tags[K] : never) | undefined;
export function tag<K extends Extract<keyof Tags, string>>(
  tags: Maybe<Tags | GroupedTags>,
  name: K,
): Tags[K] | undefined;
export function tag(tags: Maybe<Tags | GroupedTags>, name: string): unknown {
  if (tags == null) return undefined;
  const t = tags as Record<string, unknown>;
  if (Object.hasOwn(t, name)) return t[name];
  const idx = name.indexOf(":");
  if (idx >= 0) {
    // Group-prefixed name: fall back to the bare name (which may be
    // library-synthesized, or--in a bare-mode read--ExifTool's merged
    // winner, possibly from another group). Never fall back to a
    // *different* group's prefixed key:
    const bare = name.slice(idx + 1);
    return Object.hasOwn(t, bare) ? t[bare] : undefined;
  }
  // Bare name: fall back to a degrouped (last-wins) scan:
  let result: unknown = undefined;
  const suffix = ":" + name;
  for (const key of Object.keys(t)) {
    if (key.endsWith(suffix)) result = t[key];
  }
  return result;
}
