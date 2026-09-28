/**
 * Escapes text for a `/** ... *\/` comment. mktags puts metadata from sample
 * images into generated JSDoc, and an unescaped `*\/` would end the comment and
 * turn the rest of the value into TypeScript.
 */
export function escapeJSDoc(s: string): string {
  return s.replaceAll("*/", "*\\/");
}
