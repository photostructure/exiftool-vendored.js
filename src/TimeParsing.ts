import { DateTime, Zone, ZoneOptions } from "luxon"
import { Maybe } from "./Maybe"
import { notBlank, toS } from "./String"
import { TzSrc, UnsetZone, extractZone } from "./Timezones"

export interface TimeFormatMeta {
  fmt: string
  zone?: Maybe<string | Zone>
  unsetMilliseconds?: boolean
  inferredZone?: boolean
  extractedZone?: Maybe<TzSrc>
}
const TimeFmts = [
  // I haven't seen times without padded hours, minutes, or seconds in the
  // wild (yet), so those aren't handled here:
  { fmt: "HH:mm:ss.u", unsetMilliseconds: false },
  { fmt: "HH:mm:ss", unsetMilliseconds: true },
  { fmt: "HH:mm", unsetMilliseconds: true },
] as const

export function* timeFormats(args: {
  formatPrefixes?: Maybe<string[]>
  defaultZone: Maybe<string>
}): Iterable<TimeFormatMeta> {
  const inferredZone = notBlank(args.defaultZone)
  for (const prefix of args.formatPrefixes ?? [""]) {
    for (const timeFmt of TimeFmts) {
      yield {
        fmt: prefix + timeFmt.fmt,
        zone: args.defaultZone,
        unsetMilliseconds: timeFmt.unsetMilliseconds,
        inferredZone,
      }
    }
  }
}

export interface TimeParseResult {
  dt: DateTime
  fmt: string
  unsetZone: boolean
  inferredZone: boolean
  input: string
  unsetMilliseconds: boolean
}

export function parseDateTime(
  text: string,
  fmts: Iterable<TimeFormatMeta>
): Maybe<TimeParseResult> {
  const s = toS(text).trim()
  if (s.length === 0) return
  const extractedZone = extractZone(s)
  const input = extractedZone?.leftovers ?? s

  for (const ea of fmts) {
    const dt = DateTime.fromFormat(input, ea.fmt, {
      setZone: true,
      zone: extractedZone?.tz ?? ea.zone ?? UnsetZone,
    })
    if (dt == null || !dt.isValid) continue
    const unsetZone =
      extractedZone?.tz == null && (dt.zone == null || dt.zone === UnsetZone)
    let inferredZone =
      extractedZone?.tz != null || unsetZone ? false : ea.inferredZone
    if (inferredZone == null) {
      // this is pretty miserable, but luxon doesn't expose _how_ it got
      // the zone, so we have to resort to this hack to see if the zone
      // is inferred:
      const dt2 = DateTime.fromFormat(input, ea.fmt, { setZone: true })
      inferredZone = dt.zone !== dt2.zone
    }
    return {
      dt,
      fmt: ea.fmt,
      unsetZone,
      inferredZone,
      input,
      unsetMilliseconds: ea.unsetMilliseconds ?? false,
    }
  }
  return
}

export function setZone(args: {
  zone: string | Zone
  src: DateTime
  srcHasZone: boolean
  opts?: Maybe<ZoneOptions>
}): DateTime {
  // This is a bit tricky... We want to keep the local time and just _say_ it
  // was in the zone of the image **but only if we don't already have a zone.**

  // If we _do_ have a zone, assume it was already converted by ExifTool into
  // (probably the system) timezone, which means _don't_ `keepLocalTime`.

  return args.src.setZone(args.zone, {
    keepLocalTime: !args.srcHasZone,
    ...args.opts,
  })
}
