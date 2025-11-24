# Kent Beck's Four Rules of Simple Design

These rules provide objective criteria for evaluating code design. They're in priority order—higher rules take precedence over lower ones when they conflict.

## Rule 1: Passes the Tests

See [TDD.md](./TDD.md) for how test-driven development works with exiftool-vendored.

**The code must work as intended.**

- All functionality proven through automated tests
- Nothing else matters if the system behaves incorrectly
- Tests provide confidence to refactor and improve design
- Avoid tests that only verify implementation details—tests should assert correct behavior

**Example**: Before optimizing timezone inference in `ExifDateTime`, ensure comprehensive tests prove correctness across GPS-based, offset-based, and UTC delta approaches.

**Pitfall**: Don't skip tests for "simple" changes—EXIF metadata has countless edge cases across camera manufacturers.

## Rule 2: Reveals Intention

**Code should clearly express what it does and why.**

- Use descriptive names for variables, functions, and types
- Structure code to match the problem domain
- Prioritize readability for future maintainers

**Example**:

```typescript
// Poor intention
function proc(d: string): any { ... }

// Clear intention
function parseExifDateTime(rawValue: string): ExifDateTime | undefined { ... }
```

**Pitfall**: Don't sacrifice clarity for brevity—`parseExifDateTime` is better than `parseDT`.

## Rule 3: No Duplication

**Eliminate repeated logic and knowledge.**

- Look for both obvious code duplication and hidden duplication
- Hidden duplication includes parallel class hierarchies and repeated concepts
- Use codegen to eliminate manual maintenance of lookup tables

**Example**: Instead of manually maintaining tag type definitions, `mktags.ts` analyzes sample images to auto-generate `Tags.ts` with ~2000 metadata fields and popularity ratings.

**Pitfall**: Don't create premature abstractions—sometimes temporary duplication is acceptable while understanding emerges.

## Rule 4: Fewest Elements

**Remove anything that doesn't serve the first three rules.**

- Avoid classes, methods, and abstractions added for speculative future needs
- Prefer simple solutions over architecturally complex ones
- Delete unused code ruthlessly

**Example**: Don't create abstract base classes for `ReadTask` and `WriteTask` until you have concrete evidence the abstraction will be reused.

**Pitfall**: Don't over-apply this rule—necessary complexity is still necessary.

## Rule 5: No bogus guardrails or defaults

When key assumptions that your code relies upon to work appear to be broken, fail early and visibly, rather than attempting to patch things up. In particular:

- Lean towards propagating errors up to callers, instead of silently "warning" about them inside of try/catch blocks.
- If you are fairly certain data should always exist, assume it does, rather than producing code with unnecessary guardrails or existence checks (esp. if such checks might mislead other programmers)
- Never use 'defaults' as a result of errors, either for users, or downstream callers.

## Priority and Conflicts

**When rules conflict, lower-numbered rules win:**

- Working code (Rule 1) beats everything
- Clear names (Rule 2) and no duplication (Rule 3) often reinforce each other
- The "duplication vs clarity" debate misses the point—both improve together over time

**Common conflict**: During refactoring, you might temporarily duplicate code to pass tests, then eliminate duplication while improving names.

**Exception**: In test code, empathy for readers should win over technical purity.

## Quick Reference

Use this checklist during code review:

- ✅ **Tests pass**: All functionality verified
- ✅ **Clear intent**: Names and structure express purpose
- ✅ **No duplication**: Logic appears in exactly one place
- ✅ **Minimal elements**: No unused or speculative code
- ✅ **Fail fast**: Errors propagate, no silent fallbacks
