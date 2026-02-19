---
name: tpp
description: Work on a Technical Project Plan. Use when starting or continuing work on a TPP from _todo/.
argument-hint: [path-to-tpp]
disable-model-invocation: false
allowed-tools: Bash, Read, Glob, Grep, Edit, Write, WebSearch, Skill
---

# Work on TPP

Make progress on the referenced Technical Project Plan by determining the current
phase and taking appropriate action.

## Required Reading First

Before any work, read these documents:

- [CLAUDE.md](CLAUDE.md)
- [docs/SIMPLE-DESIGN.md](docs/SIMPLE-DESIGN.md)
- [docs/TDD.md](docs/TDD.md)
- [docs/TPP-GUIDE.md](docs/TPP-GUIDE.md)

## Process

1. Read the TPP from the path given (default: check `_todo/` for existing TPPs)
2. Read all documents listed in the TPP's "Required reading" section
3. Identify the current phase from the checklist
4. Execute work matching that phase:
   - **Research & Planning**: Explore code, read docs, summarize findings in TPP
   - **Write breaking tests**: Write tests that fail, proving the problem exists
   - **Design alternatives**: Propose options with pros/cons in the Solutions section
   - **Task breakdown**: Create specific, verifiable tasks with file paths and commands
   - **Implementation**: Write code, compile (`npm run compile`), run tests (`npm test`)
   - **Review & Refinement**: Lint (`npm run lint`), simplify, DRY up, remove dead code
   - **Final Integration**: Verify all tests pass, update docs if needed
   - **Review**: Final check against SIMPLE-DESIGN.md principles
5. Update the TPP with progress, findings, and any new lore
6. When done, move the TPP from `_todo/` to `_done/`

## Project Conventions

- Always run `npm run compile` before testing
- Use `??` (not `||`) for nullish coalescing
- Use `node:` prefix for Node.js imports
- Use `if (x != null)` not `if (x)` for boolean safety
- No mocks in tests - use real ExifTool and actual image files
- Conventional Commits for commit messages
- Always ask before committing or pushing
