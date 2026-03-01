# Phase 3 Context: Smart Pencil Notes & Fluidity

## 1. Note Visualization & Layout
- **Positioning:** Use a **Fixed 3x3 Mini-Grid** (e.g., '1' is always top-left, '5' is center). This aids pattern recognition.
- **Empty Placeholders:** Render **Placeholders** for missing numbers to maintain the strict 3x3 structure at all times.
- **Transition Behavior:** Pencil notes are **Suspended** (hidden) when a final value is entered. They remain in the data layer but are not rendered.
- **Styling:** Use a **Subtle Monochromatic** style (smaller font size, lighter gray/opacity) to ensure they are clearly distinct from final values without adding visual clutter.

## 2. Smart Assistance Behavior
- **Trigger:** Implement **Immediate Auto-Update**. Placing a final value ('5') instantly removes '5' as a candidate from the same row, column, and 3x3 block.
- **Reversibility:** Use **Manual Restore**. If a final value is cleared, the system does NOT automatically restore previously removed pencil notes.
- **Conflict Prevention:** **Allow All Notes**. Users can mark any number as a candidate, even if it logically conflicts with another cell (Standard Sudoku behavior).
- **Feedback:** Provide **Subtle Visual Feedback** (e.g., a brief pulse or fade) when the system automatically removes a note, to inform the user of the "Smart" action.

## 3. Multi-Cell Interaction
- **Selection Mode:** Implement **Click & Drag** for selecting ranges of cells.
- **Pencil Note Application:** Support **Bulk Add**. Pressing '5' in Note mode adds it as a candidate to all empty/mutable cells in the current selection.
- **Value Application:** Use **Single-Set**. Entering a final value only applies it to the primary focused cell (the most recently clicked/interacted one).
- **Highlighting:** Use **Primary Only** crosshairs. The row/col/block highlights should only reflect the primary focus cell, not the entire selection area.

## 4. Mode Switching UX
- **Shortcuts:** Use a **Toggle Key** (e.g., 'N' for Note) to switch between Value and Note modes.
- **Stickiness:** The mode is **Sticky**. It stays in "Note" mode until the user explicitly toggles it back to "Value".
- **Visual Feedback:** Provide a **Pencil Icon** in the UI that acts as both a manual toggle and a visual indicator (Active/Inactive states).
- **Input Overrides:** **No Change** on filled cells. If a user tries to add a pencil note to a cell that already has a final value, the input is ignored.

## 5. Code Context & Integration Points
- **Store:** `src/store/useGameStore.ts` needs to be updated with `isNoteMode` state and bulk update actions.
- **Components:** `SudokuCell.tsx` needs a nested 3x3 grid component for rendering notes.
- **Logic:** The "Smart Assistance" logic should be integrated into the `setCellValue` action in the store.
