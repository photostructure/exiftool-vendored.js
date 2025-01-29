// Reject times whose raw value is "0" or "00". TODO: We may want to reject
// "00:00", but midnight is a valid time--we'd have to reject 00:00 only if we
// could be certain this photo wasn't taken exactly at midnight.
export const OnlyZerosRE = /^0+$/;
