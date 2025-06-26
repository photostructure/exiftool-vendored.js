# Temporal API Migration Analysis

This document captures the analysis of migrating from Luxon to the JavaScript Temporal API.

## Research

- https://github.com/tc39/proposal-temporal
- https://tc39.es/proposal-temporal/docs/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal
- https://github.com/js-temporal/temporal-polyfill
- https://github.com/fullcalendar/temporal-polyfill

## Current State (May 2025)

**Luxon Usage:**

- 8 files import Luxon for datetime operations
- Heavy timezone handling: GPS inference, UTC offsets, DST adjustments
- Custom "UnsetZone" workaround for unspecified timezones
- Bundle: ~66KB (20KB gzipped)

**Temporal Status:**

- Still experimental (Stage 3)
- Neither polyfills are production-ready
- Polyfill bundle: ~200KB (50KB gzipped) vs Luxon's 66KB (20KB gzipped)

## Migration

### Prerequisites

- [ ] Temporal reaches Stage 4
- [ ] Polyfill is production-ready
- [ ] Performance validation vs Luxon

**Note:** Waiting for stable Node.js native support will take years after browsers ship

### Step 1: Add Temporal output methods alongside Luxon

```typescript
// In ExifDateTime.ts
toZonedDateTime(): Temporal.ZonedDateTime
toPlainDateTime(): Temporal.PlainDateTime
static fromZonedDateTime(zdt: Temporal.ZonedDateTime): ExifDateTime
```

**Benefits:** No breaking changes, user choice, easy adoption path

**Downsides:** This would require us to add a dependency on one of the polyfills

### Step 2: deprecate luxon output methods

### Step 3: major release, remove luxon
