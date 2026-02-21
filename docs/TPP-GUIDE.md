# Technical Project Plans (TPP) Guide

## What is a TPP?

A TPP is a markdown file in `_todo/` that persists research, design decisions, and
implementation progress across Claude Code sessions. When a session ends, `/handoff`
saves the current state. When a new session starts, `/tpp _todo/YYYYMMDD-name.md`
picks up where the last session left off.

## TPP Template

```markdown
# TPP: Feature name

## Summary

Short description (under 10 lines).

## Current phase

- [x] Research & Planning
- [ ] Write breaking tests
- [ ] Design alternatives
- [ ] Task breakdown
- [ ] Implementation
- [ ] Review & Refinement
- [ ] Final Integration
- [ ] Review

## Required reading

- CLAUDE.md
- docs/SIMPLE-DESIGN.md
- docs/TDD.md
- (add feature-specific files here)

## Description

Detailed context (under 20 lines).

## Lore

- Non-obvious details saving time
- Prior gotchas and historical context
- Relevant functions, classes, and file paths

## Solutions

### Option A (preferred)

Pros/cons with code snippets.

### Option B (alternative)

Why rejected in favor of Option A.

## Tasks

- [x] Task 1: Deliverable, files, verification command
- [ ] Task 2: ...
```

## Guidelines

- **Keep under 400 lines** (ReadTool truncates at 500)
- Each session trims redundancy while preserving critical lore
- Move completed plans to `_done/` for future reference
- Lore section accumulates institutional memory
- Before implementation, verify the plan matches intent
- TPPs are human-curated, not append-only logs
- Name files as `YYYYMMDD-feature-name.md` (e.g., `20260219-timezone-refactor.md`)

## Workflow

1. **Start a session**: `claude` (uses `claude.sh` wrapper for TPP system prompt)
2. **Enter plan mode**: `Shift+Tab` twice
3. **Work on a TPP**: `/tpp _todo/YYYYMMDD-feature.md`
4. **Before ending**: `Escape`, then `/handoff`
5. **Next session**: `/tpp _todo/YYYYMMDD-feature.md` to continue

## Project-Specific Notes

- Always run `npm run compile` before testing
- Tests use real ExifTool and real image files (no mocks)
- Follow TDD: write failing test first, then implement
- Follow SIMPLE-DESIGN.md: passes tests, reveals intention, no duplication, fewest elements
