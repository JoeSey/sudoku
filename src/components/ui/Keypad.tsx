import React from 'react';
import { useGameStore } from '../../store/useGameStore';

export const Keypad: React.FC = () => {
  const primaryIndex = useGameStore((state) => state.primaryIndex);
  const selectedIndices = useGameStore((state) => state.selectedIndices);
  const setCellValue = useGameStore((state) => state.setCellValue);
  const toggleNoteInSelection = useGameStore((state) => state.toggleNoteInSelection);
  const isNoteMode = useGameStore((state) => state.isNoteMode);
  const toggleNoteMode = useGameStore((state) => state.toggleNoteMode);
  const isPaused = useGameStore((state) => state.isPaused);

  const handleNumberClick = (num: number) => {
    if (primaryIndex === null || isPaused) return;
    
    if (isNoteMode) {
      toggleNoteInSelection(num);
    } else {
      setCellValue(primaryIndex, num);
    }
  };

  const handleClearClick = () => {
    if (selectedIndices.length === 0 || isPaused) return;
    selectedIndices.forEach(idx => {
      setCellValue(idx, null);
    });
  };

  return (
    <div className="keypad-container" style={{ opacity: isPaused ? 0.5 : 1, pointerEvents: isPaused ? 'none' : 'auto', transition: 'opacity 0.3s ease' }}>
      <div className="keypad-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            className="keypad-button"
            onClick={() => handleNumberClick(num)}
            disabled={isPaused}
          >
            {num}
          </button>
        ))}
        <button className="keypad-button clear" onClick={handleClearClick} disabled={isPaused}>
          ✕
        </button>
      </div>
      <div className="keypad-controls">
        <button 
          className={`keypad-control note-toggle ${isNoteMode ? 'active' : ''}`}
          onClick={toggleNoteMode}
          disabled={isPaused}
        >
          {isNoteMode ? '📝' : '✏️'} Note Mode: {isNoteMode ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  );
};
