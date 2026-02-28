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
    selectedCellIndex: null,

    initGame: (difficulty: Difficulty) => {
      set((state) => {
        state.difficulty = difficulty;
        state.grid = generateNewPuzzle(difficulty);
        state.selectedCellIndex = null;
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

    setSelectedCellIndex: (index: number | null) => {
      set((state) => {
        state.selectedCellIndex = index;
      });
    },

    moveSelection: (direction: 'up' | 'down' | 'left' | 'right') => {
      const { selectedCellIndex } = get();
      if (selectedCellIndex === null) return;

      const row = Math.floor(selectedCellIndex / 9);
      const col = selectedCellIndex % 9;

      let newRow = row;
      let newCol = col;

      switch (direction) {
        case 'up':
          newRow = (row - 1 + 9) % 9;
          break;
        case 'down':
          newRow = (row + 1) % 9;
          break;
        case 'left':
          newCol = (col - 1 + 9) % 9;
          break;
        case 'right':
          newCol = (col + 1) % 9;
          break;
      }

      set((state) => {
        state.selectedCellIndex = newRow * 9 + newCol;
      });
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
