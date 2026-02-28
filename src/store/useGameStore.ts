import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { GameState, Cell, Difficulty } from '../types';
import { generateNewPuzzle, checkBoardValidity } from '../utils/sudokuUtils';

const createEmptyGrid = (): Cell[] => 
  Array.from({ length: 81 }, () => ({
    value: null,
    fixed: false,
    notes: [],
  }));

export const useGameStore = create<GameState>()(
  immer((set, get) => ({
    grid: createEmptyGrid(),
    difficulty: 'medium',

    initGame: (difficulty: Difficulty) => {
      set((state) => {
        state.difficulty = difficulty;
        state.grid = generateNewPuzzle(difficulty);
      });
    },

    setCellValue: (index: number, value: number | null) => {
      set((state) => {
        if (index >= 0 && index < 81 && !state.grid[index].fixed) {
          state.grid[index].value = value;
          // Clear notes when setting a value
          state.grid[index].notes = [];
        }
      });
    },

    toggleNote: (index: number, note: number) => {
      set((state) => {
        if (index >= 0 && index < 81 && !state.grid[index].fixed && state.grid[index].value === null) {
          const notes = state.grid[index].notes;
          const noteIndex = notes.indexOf(note);
          if (noteIndex === -1) {
            notes.push(note);
          } else {
            notes.splice(noteIndex, 1);
          }
        }
      });
    },

    validateGrid: () => {
      const { grid } = get();
      return checkBoardValidity(grid);
    },

    resetGame: () => {
      set((state) => {
        state.grid.forEach((cell) => {
          if (!cell.fixed) {
            cell.value = null;
            cell.notes = [];
          }
        });
      });
    },
  }))
);
