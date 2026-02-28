# Feature Landscape: Modern Sudoku App

**Domain:** Sudoku Puzzles
**Researched:** 2024-10-24

## Table Stakes (Essential)

Features users expect in any digital Sudoku game.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| 9x9 Grid | Standard format. | Low | Use `sudoku-puzzle` for generation. |
| Difficulty Selection | Accommodate skill levels. | Low | Easy/Medium/Hard/Expert levels. |
| Pencil Marks | Basic manual notation. | Medium | Requires 3x3 mini-grid within each cell. |
| Undo/Redo | Standard for logical games. | Low | Easily implemented with state history. |
| Conflict Detection | Immediate feedback on illegal moves. | Low | Highlight row/col/box with red when digit exists. |

## Differentiators (Premium UX)

What sets a "Smart" Sudoku app apart.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Auto-Update Notes** | Removes the "busy work" of cleaning stale candidates. | Medium | Trigger on digit placement. |
| **Smart Hinting** | Teaches logic (e.g., "Naked Pair detected") rather than giving answers. | High | Requires `sudoku-core` logic analyzer. |
| **Candidate Highlighting** | Tap a number to see all its instances (filled and notes). | Low | Simple filtered rendering. |
| **Snyder Mode** | Support for enthusiast notation (marks only when 2 spots left in box). | Medium | Specialized auto-note logic. |
| **Dynamic Coloring** | Let users color-code cells/notes to track logic chains. | Medium | Extra layer in cell state. |

## Anti-Features (Avoid)

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Intrusive Ad Banner | Ruins the "Zen" focus of a logic game. | Minimalist UI, optional "Premium" or "Zen Mode". |
| Timer Pressure | Discourages thoughtful logical deduction. | Track time but keep it subtle/toggleable. |
| Instant "Game Over" | Too punishing for simple mis-taps. | Use a "3 strikes" system or just highlight the mistake. |

## Feature Dependencies

```
Grid System → Pencil Marks → Auto-Update Notes
Grid System → Difficulty Selection → Logic Analyzer
Grid System → Highlight Modes
```

## MVP Recommendation

Prioritize:
1. **Zen Grid UI** (Clean, minimalist 9x9 board)
2. **Pencil Mark Toggle** (Basic manual notation)
3. **Auto-Update Toggle** (The "Smart" differentiator)
4. **Candidate Highlighting** (Tap a digit to highlight others)

Defer: **Snyder Mode**, **Cell Coloring**, **Step-by-step logic explanations**.

## Sources

- [Good Sudoku Features](https://www.vice.com/en/article/sudoku-good-sudoku-zach-gage/)
- [Logic Wiz App Features](https://logicwiz.com/)
