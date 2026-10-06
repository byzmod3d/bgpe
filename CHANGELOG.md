# BGPE — Changelog

All notable changes to BGPE — BravosGamebr Pixel Editor.

---

## v1.0.0 — First stable release

Initial public release with the following fixes applied during development.

### 🐛 Bug Fixes

**Selection tools:**
- Fixed: single click on canvas with Rect/Circle/Move created invisible 1×1 selections
- Fixed: Move tool icon now updates correctly when switching to Rect via drag
- Fixed: Lasso behaves correctly (click-by-click)

**Transforms (R / G / S):**
- Fixed: R/G/S activated without a selection, deforming the entire frame
- Fixed: chained transforms (R → G → S) caused visual glitches
- Fixed: arrow keys conflicted with R/G/S — removed entirely

**UI / UX:**
- Removed: noisy green flash notifications
- Removed: large center text (MOVE, ROTATE, GRAB, SCALE)
- Fixed: Screencast panel was floating over the editor
- Fixed: Screencast panel interfered with selection tools

**Landing page:**
- Updated: Move tool description
- Removed: obsolete shortcuts (Enter, arrow keys)

### ✨ Improvements

- **Cleaner canvas** — no floating overlays
- **More predictable** — single click doesn't create selections
- **Better UX** — R/G/S only activate with a selection
- **Screencast** — docked in sidebar, never in the way

### 🔄 Changes

- **Arrow keys removed** — use **G** (Grab) to move
- **Enter removed** — use left-click to apply, right-click to cancel

