import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { GameState, Cell, Difficulty } from '../types';
import { generateNewPuzzle, checkBoardValidity, getAllConflicts } from '../utils/sudokuUtils';

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
    selectedIndices: [],
    primaryIndex: null,
    isNoteMode: false,
    settings: {
      instantFeedback: true,
    },
    conflicts: [],

    initGame: (difficulty: Difficulty) => {
      set((state) => {
        state.difficulty = difficulty;
        state.grid = generateNewPuzzle(difficulty);
        state.selectedIndices = [];
        state.primaryIndex = null;
        state.isNoteMode = false;
        state.conflicts = [];
      });
    },

    setCellValue: (index: number, value: number | null) => {
      set((state) => {
        if (index >= 0 && index < 81 && !state.grid[index].fixed) {
          state.grid[index].value = value;
          
          // Smart Assistance: remove this value from notes in the same row, col, and block
          if (value !== null) {
            const row = Math.floor(index / 9);
            const col = index % 9;
            const blockStartRow = Math.floor(row / 3) * 3;
            const blockStartCol = Math.floor(col / 3) * 3;

            for (let i = 0; i < 81; i++) {
              const r = Math.floor(i / 9);
              const c = i % 9;
              const inSameRow = r === row;
              const inSameCol = c === col;
              const inSameBlock = (r >= blockStartRow && r < blockStartRow + 3) &&
                                 (c >= blockStartCol && c < blockStartCol + 3);

              if (inSameRow || inSameCol || inSameBlock) {
                const notes = state.grid[i].notes;
                const noteIndex = notes.indexOf(value);
                if (noteIndex !== -1) {
                  notes.splice(noteIndex, 1);
                }
              }
            }
          }

          if (state.settings.instantFeedback) {
            state.conflicts = getAllConflicts(state.grid);
          }
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
            notes.sort((a, b) => a - b);
          } else {
            notes.splice(noteIndex, 1);
          }
        }
      });
    },

    toggleNoteMode: () => {
      set((state) => {
        state.isNoteMode = !state.isNoteMode;
      });
    },

    validateGrid: () => {
      const { grid } = get();
      return checkBoardValidity(grid);
    },

    checkConflicts: () => {
      set((state) => {
        state.conflicts = getAllConflicts(state.grid);
      });
    },

    setSelection: (indices: number[], primary?: number | null) => {
      set((state) => {
        state.selectedIndices = indices;
        state.primaryIndex = primary !== undefined ? primary : (indices.length > 0 ? indices[indices.length - 1] : null);
      });
    },

    moveSelection: (direction: 'up' | 'down' | 'left' | 'right') => {
      const { primaryIndex } = get();
      if (primaryIndex === null) return;

      const row = Math.floor(primaryIndex / 9);
      const col = primaryIndex % 9;

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

      const newIndex = newRow * 9 + newCol;
      set((state) => {
        state.selectedIndices = [newIndex];
        state.primaryIndex = newIndex;
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
        state.conflicts = [];
      });
    },
  }))
);
