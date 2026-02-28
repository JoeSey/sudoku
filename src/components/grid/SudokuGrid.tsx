import React from 'react';
import { SudokuCell } from './SudokuCell';
import { useGameStore } from '../../store/useGameStore';

export const SudokuGrid: React.FC = () => {
  const moveSelection = useGameStore((state) => state.moveSelection);
  const setCellValue = useGameStore((state) => state.setCellValue);
  const setSelectedCellIndex = useGameStore((state) => state.setSelectedCellIndex);
  const selectedCellIndex = useGameStore((state) => state.selectedCellIndex);
  const grid = useGameStore((state) => state.grid);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedCellIndex === null) return;

    // Number input (1-9)
    if (/^[1-9]$/.test(e.key)) {
      e.preventDefault();
      setCellValue(selectedCellIndex, parseInt(e.key, 10));
      return;
    }

    // Clearing (Backspace/Delete)
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      setCellValue(selectedCellIndex, null);
      return;
    }

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        moveSelection('up');
        break;
      case 'ArrowDown':
        e.preventDefault();
        moveSelection('down');
        break;
      case 'ArrowLeft':
        e.preventDefault();
        moveSelection('left');
        break;
      case 'ArrowRight':
        e.preventDefault();
        moveSelection('right');
        break;
      case 'Tab': {
        e.preventDefault();
        const direction = e.shiftKey ? -1 : 1;
        let nextIndex = selectedCellIndex === null ? 0 : (selectedCellIndex + direction + 81) % 81;

        // Find next non-fixed cell
        while (grid[nextIndex].fixed) {
          nextIndex = (nextIndex + direction + 81) % 81;
          // Security break if all cells are fixed
          if (nextIndex === (selectedCellIndex === null ? 0 : selectedCellIndex)) break;
        }
        setSelectedCellIndex(nextIndex);
        break;
      }
    }
  };

  // Array of 81 indices
  const indices = Array.from({ length: 81 }, (_, i) => i);

  return (
    <div 
      className="sudoku-grid"
      onKeyDown={handleKeyDown}
      role="grid"
    >
      {indices.map((index) => (
        <SudokuCell key={index} index={index} />
      ))}
    </div>
  );
};
