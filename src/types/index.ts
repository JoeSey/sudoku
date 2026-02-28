export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface Cell {
  value: number | null;
  fixed: boolean;
  notes: number[];
}

export interface GameSettings {
  instantFeedback: boolean;
}

export interface GameState {
  grid: Cell[];
  difficulty: Difficulty;
  selectedIndices: number[];
  primaryIndex: number | null;
  isNoteMode: boolean;
  settings: GameSettings;
  conflicts: number[];
  initGame: (difficulty: Difficulty) => void;
  setCellValue: (index: number, value: number | null) => void;
  toggleNote: (index: number, note: number) => void;
  toggleNoteMode: () => void;
  validateGrid: () => boolean;
  setSelection: (indices: number[], primary?: number | null) => void;
  moveSelection: (direction: 'up' | 'down' | 'left' | 'right') => void;
  resetGame: () => void;
  checkConflicts: () => void;
}
