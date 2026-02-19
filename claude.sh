#!/bin/bash

# Claude Code wrapper: injects project TPP instructions into system prompt
#
# Details: https://photostructure.com/coding/claude-code-tpp/
#
# Setup: Add to ~/.bashrc, ~/.bash_aliases, or ~/.zshrc:
#
#   claude() {
#     if [ -f "./claude.sh" ]; then ./claude.sh "$@"; else command claude "$@"; fi
#   }

echo "Adding project system prompt..."

DATE=$(date +%Y-%m-%d)

command claude --append-system-prompt "$(
  cat ~/.claude/CLAUDE.md 2>/dev/null || true
  echo "- Current date: $DATE"
  cat <<'SYSTEM'

This project uses Technical Project Plans in _todo/*.md to share research,
design decisions, and next steps between sessions.

When exiting plan mode, write or update the relevant TPP using /handoff.

When context runs low while working on a TPP, run /handoff immediately.

Check _todo/ for existing TPPs before starting new work.

SYSTEM
)" "$@"
