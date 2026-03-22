---
name: replan
description: Iterative deep planning with critiques and alternatives. Use when facing complex design decisions requiring thorough analysis.
allowed-tools: Read, Glob, Grep, WebSearch, WebFetch
---

# Replan

You are going to **replan** - an iterative process of designing, critiquing, and refining a plan.

## Required Reading First

Before any work, you MUST read:

- [CLAUDE.md](CLAUDE.md)
- [docs/SIMPLE-DESIGN.md](docs/SIMPLE-DESIGN.md)
- [docs/TDD.md](docs/TDD.md)

## Process

### 1. Understand & Clarify

- Read relevant code, documentation, and constraints
- State any assumptions you're making
- Ask clarifying questions before proceeding

### 2. Initial Plan

Design your first approach, considering requirements and existing solutions.

### 3. Critique

Generate thorough critiques of your plan:

**General design:**

- Does it balance simplicity with good engineering?
- Is it maintainable, testable, DRY, scalable?
- Scrutinize for "hand-wavy" aspects - don't assume how things work, study the code
- For novel libraries/APIs, validate with web searches
- Note uncertainties as risks

**Project-specific:**

- Does this preserve backwards compatibility for 500+ downstream consumers?
- Does this affect ExifTool process pool performance or startup latency?
- Does this handle timezone edge cases correctly (DST transitions, GPS inference, UTC deltas)?
- Does this introduce new dependencies? Are they justified for a library this widely used?
- Will this work cross-platform (Linux, macOS, Windows)?
- Does this respect the auto-generated nature of Tags.ts (changes belong in mktags, not manual edits)?
- Does the approach fail fast on errors rather than silently falling back to defaults?
- Does this interact correctly with batch-cluster's process management?

### 4. Alternatives

Brainstorm alternatives based on critiques. Goals:

- Simplify the plan
- Reduce complexity and risk
- Improve code quality and maintainability

### 5. Develop Best Alternative

Select the most promising alternative and develop it fully.

### 6. Iterate

Repeat steps 3-5 at least **three times**, asking for user feedback at each iteration.

### 7. Final Plan

Assemble the best features from all iterations into a robust final plan.

## Output Format

For each iteration, present options with pros/cons:

### Option A: [Name]

[Description]

**Pros:** ...
**Cons:** ...
**Risks:** ...

### Recommendation

[Which option and why, per SIMPLE-DESIGN.md principles]

## Guidelines

- Follow Kent Beck's Four Rules of Simple Design as defined in docs/SIMPLE-DESIGN.md (in priority order: passes tests, reveals intention, no duplication, fewest elements, no bogus guardrails)
- Consider coupling, cohesion, testability
- Be honest about tradeoffs
- Ask questions - don't guess
- No mocks - plan for integration tests with real ExifTool and actual image files
- Use `??` not `||`, `!= null` not `!`, standard `node:` imports
