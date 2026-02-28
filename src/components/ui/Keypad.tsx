import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';

export const Keypad: React.FC = () => {
  const selectedCellIndex = useGameStore((state) => state.selectedCellIndex);
  const setCellValue = useGameStore((state) => state.setCellValue);
  const toggleNote = useGameStore((state) => state.toggleNote);
  
  // Note mode state (Phase 3 placeholder)
  const [noteMode, setNoteMode] = useState(false);

  const handleNumberClick = (num: number) => {
    if (selectedCellIndex === null) return;
    
    if (noteMode) {
      toggleNote(selectedCellIndex, num);
    } else {
      setCellValue(selectedCellIndex, num);
    }
  };

  const handleClearClick = () => {
    if (selectedCellIndex === null) return;
    setCellValue(selectedCellIndex, null);
  };

  return (
    <div className="keypad-container">
      <div className="keypad-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            className="keypad-button"
            onClick={() => handleNumberClick(num)}
          >
            {num}
          </button>
        ))}
        <button className="keypad-button clear" onClick={handleClearClick}>
          ✕
        </button>
      </div>
      <div className="keypad-controls">
        <button 
          className={`keypad-control note-toggle ${noteMode ? 'active' : ''}`}
          onClick={() => setNoteMode(!noteMode)}
        >
          Note Mode: {noteMode ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  );
};
