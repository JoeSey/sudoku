# Phase 1: Core Engine & Scaffolding - Research

**Researched:** 2026-02-28
**Domain:** React, TypeScript, Zustand, Sudoku Logic
**Confidence:** HIGH

## Summary
This phase focuses on establishing a robust foundation for the Sudoku application. We will use React with TypeScript for type safety and Zustand for high-performance state management of the 81-cell grid. The `sudoku-puzzle` library will handle puzzle generation, solving, and validation. The architecture prioritizes minimal re-renders by using Zustand's selective subscription model, ensuring the UI remains fluid even with rapid inputs.

**Primary recommendation:** Use a normalized 1D array of 81 objects for the grid state in Zustand to simplify indexing and performance optimizations.

## User Constraints
Using defaults from PROJECT.md and config.json.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 18+ | UI Framework | Industry standard, hooks-based. |
| TypeScript | 5+ | Type Safety | Essential for complex grid logic. |
| Zustand | 4.5+ | State Management | High performance for many small updates. |
| Immer | 10+ | Immutable Updates | Makes nested state updates readable. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|--------------|
| `sudoku-puzzle` | 1.0.1 | Logic Engine | Generation, Solving, Validation. |
| `lucide-react` | Latest | Icons | Minimalist UI icons. |

**Installation:**
```bash
npm install zustand immer sudoku-puzzle lucide-react
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── grid/
│   │   ├── SudokuGrid.tsx
│   │   ├── SudokuCell.tsx
│   │   └── SudokuRow.tsx
│   └── ui/
├── store/
│   └── useGameStore.ts
├── hooks/
├── utils/
│   └── sudokuUtils.ts
├── types/
│   └── index.ts
└── App.tsx
```

### Pattern 1: Normalized Grid State
Store the grid as a flat array of 81 objects. This simplifies cell-to-index mapping and allows individual cells to subscribe to their specific slice of state.

### Anti-Patterns to Avoid
- **React Context for Grid:** Avoid using Context for the 81-cell grid as any update will trigger a full grid re-render without complex memoization.
- **Nested 2D Arrays in State:** While intuitive for display, 1D arrays are often easier to manage for Sudoku logic (index = row * 9 + col).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Puzzle Generation | Custom backtracking | `sudoku-puzzle` | Validating uniqueness and difficulty is non-trivial. |
| Validation | Complex row/col/box logic | `sudoku-puzzle` | Library already handles standard rules efficiently. |

## Common Pitfalls

### Pitfall 1: O(N^2) Re-renders
**What goes wrong:** Typing a number in one cell causes all 81 cells to re-render.
**How to avoid:** Use Zustand selectors like `useGameStore(state => state.grid[index])` inside the `SudokuCell` component.

### Pitfall 2: Missing Type Definitions
**What goes wrong:** `sudoku-puzzle` may not have built-in types.
**How to avoid:** Define a `declarations.d.ts` for the library or use a custom type mapping.

## Code Examples

### Zustand Store Setup
```typescript
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface Cell {
  value: number | null;
  fixed: boolean;
  notes: number[];
}

interface GameState {
  grid: Cell[];
  setCellValue: (index: number, value: number | null) => void;
}

export const useGameStore = create<GameState>()(
  immer((set) => ({
    grid: Array(81).fill(null).map(() => ({ value: null, fixed: false, notes: [] })),
    setCellValue: (index, value) => set((state) => {
      state.grid[index].value = value;
    }),
  }))
);
```
