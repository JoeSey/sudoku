import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import { GameState, Cell, Difficulty } from '../types';
import { generateNewPuzzle, checkBoardValidity, getAllConflicts } from '../utils/sudokuUtils';

const createEmptyGrid = (): Cell[] => 
  Array.from({ length: 81 }, () => ({
    value: null,
    fixed: false,
    notes: [],
  }));

interface Snapshot {
  grid: Cell[];
  isAutoNotesUsed: boolean;
  mistakeCount: number;
}

export const useGameStore = create<GameState>()(
  persist(
    immer((set, get) => {
      // Use closure for history to avoid including it in persist if we want (optional)
      // Actually, persisting history is good for UX.
      let past: Snapshot[] = [];
      let future: Snapshot[] = [];

      const pushSnapshot = (state: any) => {
        // Deep clone the grid to ensure snapshot is immutable
        past.push({
          grid: JSON.parse(JSON.stringify(state.grid)),
          isAutoNotesUsed: state.isAutoNotesUsed,
          mistakeCount: state.mistakeCount,
        });
        if (past.length > 50) past.shift(); // Limit history
        future = []; // Clear redo stack on new action
        state.canUndo = past.length > 0;
        state.canRedo = false;
      };

      return {
        grid: createEmptyGrid(),
        difficulty: 'medium',
        selectedIndices: [],
        primaryIndex: null,
        isNoteMode: false,
        isAutoNotesUsed: false,
        settings: {
          instantFeedback: true,
        },
        conflicts: [],
        lastCleanedIndices: [],
        timer: 0,
        isPaused: false,
        mistakeCount: 0,
        isGameWon: false,
        bestTimes: {
          easy: null,
          medium: null,
          hard: null,
          expert: null,
        },

        canUndo: false,
        canRedo: false,

        undo: () => {
          set((state) => {
            if (past.length === 0) return;
            
            // Current to future
            future.push({
              grid: JSON.parse(JSON.stringify(state.grid)),
              isAutoNotesUsed: state.isAutoNotesUsed,
              mistakeCount: state.mistakeCount,
            });
            
            const snapshot = past.pop()!;
            state.grid = snapshot.grid;
            state.isAutoNotesUsed = snapshot.isAutoNotesUsed;
            state.mistakeCount = snapshot.mistakeCount;
            state.conflicts = getAllConflicts(state.grid);

            state.canUndo = past.length > 0;
            state.canRedo = future.length > 0;
          });
        },

        redo: () => {
          set((state) => {
            if (future.length === 0) return;
            
            // Current to past
            past.push({
              grid: JSON.parse(JSON.stringify(state.grid)),
              isAutoNotesUsed: state.isAutoNotesUsed,
              mistakeCount: state.mistakeCount,
            });
            
            const snapshot = future.pop()!;
            state.grid = snapshot.grid;
            state.isAutoNotesUsed = snapshot.isAutoNotesUsed;
            state.mistakeCount = snapshot.mistakeCount;
            state.conflicts = getAllConflicts(state.grid);

            state.canUndo = past.length > 0;
            state.canRedo = future.length > 0;
          });
        },

        initGame: (difficulty: Difficulty) => {
          set((state) => {
            state.difficulty = difficulty;
            state.grid = generateNewPuzzle(difficulty);
            state.selectedIndices = [];
            state.primaryIndex = null;
            state.isNoteMode = false;
            state.isAutoNotesUsed = false;
            state.conflicts = [];
            state.lastCleanedIndices = [];
            state.timer = 0;
            state.isPaused = false;
            state.mistakeCount = 0;
            state.isGameWon = false;
            
            past = [];
            future = [];
            state.canUndo = false;
            state.canRedo = false;
          });
        },

        setCellValue: (index: number, value: number | null) => {
          set((state) => {
            if (index < 0 || index >= 81 || state.grid[index].fixed) return;
            if (state.grid[index].value === value) return; // No change

            pushSnapshot(state);
            state.lastCleanedIndices = [];
            state.grid[index].value = value;

            // Smart Assistance: remove this value from notes in the same row, col, and block
            if (value !== null) {
              const row = Math.floor(index / 9);
              const col = index % 9;
              const blockStartRow = Math.floor(row / 3) * 3;
              const blockStartCol = Math.floor(col / 3) * 3;

              for (let i = 0; i < 81; i++) {
                if (i === index) continue;

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
                    state.lastCleanedIndices.push(i);
                  }
                }
              }
            }

            if (state.settings.instantFeedback) {
              const newConflicts = getAllConflicts(state.grid);
              if (value !== null && newConflicts.includes(index)) {
                 state.mistakeCount += 1;
              }
              state.conflicts = newConflicts;
            }

            // Win Detection
            const isFilled = state.grid.every(cell => cell.value !== null);
            if (isFilled) {
              const currentConflicts = getAllConflicts(state.grid);
              if (currentConflicts.length === 0) {
                state.isGameWon = true;
                const currentDifficulty = state.difficulty;
                const currentTime = state.timer;
                const currentMistakes = state.mistakeCount;
                const best = state.bestTimes[currentDifficulty];
                const autoNotes = state.isAutoNotesUsed;

                if (!best || currentTime < best.time) {
                  state.bestTimes[currentDifficulty] = {
                    time: currentTime,
                    mistakes: currentMistakes,
                    autoNotes,
                  };
                }
              }
            }
          });
        },
        toggleNote: (index: number, note: number) => {
          set((state) => {
            if (index >= 0 && index < 81 && !state.grid[index].fixed && state.grid[index].value === null) {
              pushSnapshot(state);
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

        fillAutoNotes: () => {
          set((state) => {
            pushSnapshot(state);
            state.isAutoNotesUsed = true;
            for (let i = 0; i < 81; i++) {
              if (state.grid[i].value === null) {
                const row = Math.floor(i / 9);
                const col = i % 9;
                const blockStartRow = Math.floor(row / 3) * 3;
                const blockStartCol = Math.floor(col / 3) * 3;

                const possibleNotes = [];
                for (let num = 1; num <= 9; num++) {
                  let isPossible = true;
                  for (let j = 0; j < 81; j++) {
                    const r = Math.floor(j / 9);
                    const c = j % 9;
                    if (((r === row) || (c === col) || ((Math.floor(r/3)*3 === blockStartRow) && (Math.floor(c/3)*3 === blockStartCol))) && state.grid[j].value === num) {
                      isPossible = false;
                      break;
                    }
                  }
                  if (isPossible) possibleNotes.push(num);
                }
                state.grid[i].notes = possibleNotes;
              }
            }
          });
        },

        clearAllNotes: () => {
          set((state) => {
            pushSnapshot(state);
            for (let i = 0; i < 81; i++) {
              state.grid[i].notes = [];
            }
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
            case 'up': newRow = (row - 1 + 9) % 9; break;
            case 'down': newRow = (row + 1) % 9; break;
            case 'left': newCol = (col - 1 + 9) % 9; break;
            case 'right': newCol = (col + 1) % 9; break;
          }

          const newIndex = newRow * 9 + newCol;
          set((state) => {
            state.selectedIndices = [newIndex];
            state.primaryIndex = newIndex;
          });
        },

        resetGame: () => {
          set((state) => {
            pushSnapshot(state);
            state.grid.forEach((cell) => {
              if (!cell.fixed) {
                cell.value = null;
                cell.notes = [];
              }
            });
            state.conflicts = [];
            state.isAutoNotesUsed = false;
          });
        },

        setCellValueInSelection: (value: number | null) => {
          const { selectedIndices } = get();
          if (selectedIndices.length === 0) return;

          set((state) => {
            pushSnapshot(state);
            selectedIndices.forEach((index) => {
              if (index >= 0 && index < 81 && !state.grid[index].fixed) {
                state.grid[index].value = value;
                // Cleanup notes... (simplified for brevity here, should ideally reuse logic)
                if (value !== null) {
                  const row = Math.floor(index / 9);
                  const col = index % 9;
                  const blockStartRow = Math.floor(row / 3) * 3;
                  const blockStartCol = Math.floor(col / 3) * 3;
                  for (let i = 0; i < 81; i++) {
                    const r = Math.floor(i / 9);
                    const c = i % 9;
                    if ((r === row || c === col || (Math.floor(r/3)*3 === blockStartRow && Math.floor(c/3)*3 === blockStartCol)) && i !== index) {
                      const noteIdx = state.grid[i].notes.indexOf(value);
                      if (noteIdx !== -1) state.grid[i].notes.splice(noteIdx, 1);
                    }
                  }
                }
              }
            });

            if (state.settings.instantFeedback) {
              const newConflicts = getAllConflicts(state.grid);
              if (value !== null) {
                 const mistakes = selectedIndices.filter(idx => newConflicts.includes(idx)).length;
                 state.mistakeCount += mistakes;
              }
              state.conflicts = newConflicts;
            }

            // Win Detection
            const isFilled = state.grid.every(cell => cell.value !== null);
            if (isFilled && getAllConflicts(state.grid).length === 0) {
              state.isGameWon = true;
              const currentTime = state.timer;
              const best = state.bestTimes[state.difficulty];
              if (!best || currentTime < best.time) {
                state.bestTimes[state.difficulty] = { time: currentTime, mistakes: state.mistakeCount, autoNotes: state.isAutoNotesUsed };
              }
            }
          });
        },

        toggleNoteInSelection: (note: number) => {
          const { selectedIndices } = get();
          if (selectedIndices.length === 0) return;

          set((state) => {
            pushSnapshot(state);
            const firstCell = state.grid[selectedIndices[0]];
            const shouldAdd = !firstCell.notes.includes(note);

            selectedIndices.forEach((index) => {
              if (index >= 0 && index < 81 && !state.grid[index].fixed && state.grid[index].value === null) {
                const notes = state.grid[index].notes;
                const noteIndex = notes.indexOf(note);
                if (shouldAdd && noteIndex === -1) {
                  notes.push(note);
                  notes.sort((a, b) => a - b);
                } else if (!shouldAdd && noteIndex !== -1) {
                  notes.splice(noteIndex, 1);
                }
              }
            });
          });
        },

        tickTimer: () => {
          set((state) => {
            if (!state.isPaused && !state.isGameWon) {
              state.timer += 1;
            }
          });
        },

        togglePause: (paused?: boolean) => {
          set((state) => {
            state.isPaused = paused !== undefined ? paused : !state.isPaused;
          });
        },

        incrementMistakes: () => {
          set((state) => {
            state.mistakeCount += 1;
          });
        },

        setGameWon: (won: boolean) => {
          set((state) => {
            state.isGameWon = won;
          });
        },

        saveBestTime: () => {
          set((state) => {
            const best = state.bestTimes[state.difficulty];
            if (!best || state.timer < best.time) {
              state.bestTimes[state.difficulty] = { time: state.timer, mistakes: state.mistakeCount, autoNotes: state.isAutoNotesUsed };
            }
          });
        },
      };
    }),
    {
      name: 'sudoku-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
