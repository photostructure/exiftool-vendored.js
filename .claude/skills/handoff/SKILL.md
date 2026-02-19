---
name: handoff
description: Update TPP for handoff when context is running low or you are about to exit plan mode.
disable-model-invocation: false
allowed-tools: Read, Edit, Write, Glob
---

# TPP Handoff

Update the current TPP with everything learned during this session before context
depletes or the session ends.

## Required Reading First

- [CLAUDE.md](CLAUDE.md)
- [docs/TPP-GUIDE.md](docs/TPP-GUIDE.md)

## Your Task

1. Find the active TPP: check `_todo/` for the file you've been working on
2. Re-read the current TPP fully
3. Update it with:
   - Mark completed tasks with `[x]`
   - Advance the current phase if appropriate
   - Document discoveries and gotchas in the Lore section
   - Record failed approaches (so the next session doesn't repeat them)
   - Clarify remaining work and any blockers
   - Add file paths, function names, and code references discovered during the session
4. Trim redundancy while preserving critical insights
5. Keep the TPP under 400 lines (ReadTool truncates at 500)
6. If all tasks are complete, move the TPP from `_todo/` to `_done/`
