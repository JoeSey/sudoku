export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface Cell {
  value: number | null;
  fixed: boolean;
  notes: number[];
}

export type HighlightColor = 'gray' | 'blue' | 'green' | 'red';

export interface GameSettings {
  instantFeedback: boolean;
  normalHighlightColor: HighlightColor;
  zenHighlightColor: HighlightColor;
  showHintButton: boolean;
}

export interface Snapshot {
  grid: Cell[];
  isAutoNotesUsed: boolean;
  mistakeCount: number;
}

export interface Hint {
  strategy: string;
  description: string;
  targetIndices: number[];
  reasonIndices: number[];
  value?: number;
  eliminates?: { index: number; value: number }[];
}

export interface GameState {
  grid: Cell[];
  difficulty: Difficulty;
  selectedIndices: number[];
  primaryIndex: number | null;
  isNoteMode: boolean;
  isAutoNotesUsed: boolean;
  useSymmetry: boolean;
  isZenMode: boolean;
  isAssisted: boolean;
  activeHint: Hint | null;
  settings: GameSettings;
  conflicts: number[];
  lastCleanedIndices: number[];
  timer: number;
  isPaused: boolean;
  mistakeCount: number;
  bestTimes: Record<Difficulty, { time: number; mistakes: number; autoNotes: boolean; isAssisted: boolean } | null>;
  isGameWon: boolean;

  // History
  past: Snapshot[];
  future: Snapshot[];
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;

  initGame: (difficulty: Difficulty, useSymmetry?: boolean) => void;
  toggleZenMode: () => void;
  setCellValue: (index: number, value: number | null) => void;
  toggleNote: (index: number, note: number) => void;
  toggleNoteMode: () => void;
  fillAutoNotes: () => void;
  clearAllNotes: () => void;
  validateGrid: () => boolean;
  checkConflicts: () => void;
  setSelection: (indices: number[], primary?: number | null) => void;
  moveSelection: (direction: 'up' | 'down' | 'left' | 'right') => void;
  resetGame: () => void;
  setCellValueInSelection: (value: number | null) => void;
  toggleNoteInSelection: (note: number) => void;
  tickTimer: () => void;
  togglePause: (paused?: boolean) => void;
  incrementMistakes: () => void;
  setGameWon: (won: boolean) => void;
  saveBestTime: () => void;
  showHint: () => void;
  clearHint: () => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
}
