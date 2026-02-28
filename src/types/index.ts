export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface Cell {
  value: number | null;
  fixed: boolean;
  notes: number[];
}

export interface GameState {
  grid: Cell[];
  difficulty: Difficulty;
  selectedCellIndex: number | null;
  initGame: (difficulty: Difficulty) => void;
  setCellValue: (index: number, value: number | null) => void;
  toggleNote: (index: number, note: number) => void;
  validateGrid: () => boolean;
  setSelectedCellIndex: (index: number | null) => void;
  moveSelection: (direction: 'up' | 'down' | 'left' | 'right') => void;
  resetGame: () => void;
}
