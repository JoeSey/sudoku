declare module 'sudoku-puzzle' {
    export function generateSudoku(size?: number, complexity?: number): number[][];
    export function solveSudoku(board: number[][]): number[][] | null;
    export function isBoardValid(board: number[][]): boolean;
}
