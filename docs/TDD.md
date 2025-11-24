# Test-Driven Development (TDD) Guide

## Red-Green-Refactor

1. **Red**: Write a failing test that describes the desired behavior
2. **Green**: Write the minimal code to make the test pass
3. **Refactor**: Improve the code while keeping tests green

## Principles

- **Tests define behavior**: Write tests first to clarify _what_ code should do before _how_
- **No Mocks**: Use real ExifTool and actual image files
- **Integration focus**: Test the full stack, not isolated units
- **Refactoring may not need new tests**: If coverage exists, just refactor and re-run

See [SIMPLE-DESIGN.md](./SIMPLE-DESIGN.md) for design principles.

## Running Tests

```bash
npm run compile              # Always compile first
npm test                     # Run all tests
npx mocha dist/Foo.spec.js   # Run specific file
npx mocha 'dist/*.spec.js' --grep "pattern"  # Filter by name
```

Watch mode for TDD cycles:

```bash
npm run compile:watch        # Terminal 1
npx mocha dist/Foo.spec.js   # Terminal 2 (re-run as needed)
```

## Test Helpers

Import from `_chai.spec`:

```typescript
import {
  expect,
  testImg,
  testDir,
  end,
  tmpname,
  NonAlphaStrings,
} from "./_chai.spec";
```

| Helper                                   | Description                                           |
| ---------------------------------------- | ----------------------------------------------------- |
| `testDir`                                | Path to `test/` directory (for read-only access)      |
| `testImg({srcBasename?, destBasename?})` | Copies test image to temp dir (async)                 |
| `tmpname(prefix?)`                       | Generates unique temp file path                       |
| `end(et)`                                | Ends ExifTool instance AND asserts no internal errors |
| `NonAlphaStrings`                        | Unicode test strings for filename testing             |
| `assertEqlDateish(a, b)`                 | Compares date/time values as EXIF strings             |

## Patterns

### Data-Driven Tests

```typescript
describe("ExifDateTime", () => {
  for (const { desc, exif, iso } of [
    {
      desc: "no zone",
      exif: "2016:09:12 07:28:50",
      iso: "2016-09-12T07:28:50",
    },
    { desc: "zulu", exif: "1999:01:02 03:04:05Z", iso: "1999-01-02T03:04:05Z" },
    {
      desc: "offset",
      exif: "2002:10:11 13:14:15-03:00",
      iso: "2002-10-11T13:14:15-03:00",
    },
  ]) {
    it(desc, () =>
      expect(ExifDateTime.fromEXIF(exif)?.toISOString()).to.eql(iso),
    );
  }
});
```

### Integration with Temp Files

```typescript
describe("ExifTool.write()", () => {
  after(() => end(exiftool));

  it("writes and reads back tags", async () => {
    const img = await testImg({ srcBasename: "img.jpg" });
    await exiftool.write(img, { Copyright: "Test" });
    expect((await exiftool.read(img)).Copyright).to.eql("Test");
  });
});
```

### Unicode Filenames

```typescript
for (const { str, desc } of NonAlphaStrings) {
  it(`handles ${desc}`, async () => {
    const img = await testImg({
      srcBasename: "img.jpg",
      destBasename: `test-${str}.jpg`,
    });
    expect((await exiftool.read(img)).SourceFile).to.include(str);
  });
}
```

## Best Practices

- **Specific tests**: `"parses ISO as number"` not `"handles metadata"`
- **Real files**: Use `testImg()`, never mock ExifTool
- **Always clean up**: Use `end(et)` in `after()` hooks
- **Test errors**: `await expect(fn()).to.be.rejectedWith(/pattern/)`

## Workflow

**New features**: Unit tests for parsing → Integration tests with real files → Edge cases

**Bug fixes**: Write failing test → Fix bug → Verify no regressions

**Refactoring**: Verify tests pass → Small steps → Run tests frequently
