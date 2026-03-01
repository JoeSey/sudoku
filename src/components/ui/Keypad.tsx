import React from 'react';
import { useGameStore } from '../../store/useGameStore';

export const Keypad: React.FC = () => {
  const grid = useGameStore((state) => state.grid);
  const primaryIndex = useGameStore((state) => state.primaryIndex);
  const selectedIndices = useGameStore((state) => state.selectedIndices);
  const setCellValue = useGameStore((state) => state.setCellValue);
  const toggleNoteInSelection = useGameStore((state) => state.toggleNoteInSelection);
  const isNoteMode = useGameStore((state) => state.isNoteMode);
  const toggleNoteMode = useGameStore((state) => state.toggleNoteMode);
  const fillAutoNotes = useGameStore((state) => state.fillAutoNotes);
  const clearAllNotes = useGameStore((state) => state.clearAllNotes);
  const undo = useGameStore((state) => state.undo);
  const redo = useGameStore((state) => state.redo);
  const canUndo = useGameStore((state) => state.canUndo);
  const canRedo = useGameStore((state) => state.canRedo);
  const isPaused = useGameStore((state) => state.isPaused);

  const getDigitCount = (num: number) => {
    return grid.filter(cell => cell.value === num).length;
  };

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
        {/* Row 1: 1-5 + Undo */}
        {[1, 2, 3, 4, 5].map((num) => {
          const count = getDigitCount(num);
          const percentage = (Math.min(count, 9) / 9) * 100;
          return (
            <button
              key={num}
              className={`keypad-button ${count >= 9 ? 'completed' : ''}`}
              onClick={() => handleNumberClick(num)}
              disabled={isPaused}
              style={{
                background: `conic-gradient(#e5e5e5 ${percentage}%, #ffffff 0)`
              }}
            >
              <span className="digit-label">{num}</span>
            </button>
          );
        })}
        <button 
          className="keypad-button history-btn undo-btn"
          onClick={undo}
          disabled={!canUndo || isPaused}
          title="Undo (Ctrl+Z)"
        >
          <div className="note-icon">↶</div>
          <div className="note-label">UNDO</div>
        </button>

        {/* Row 2: 6-9 + Clear + Redo */}
        {[6, 7, 8, 9].map((num) => {
          const count = getDigitCount(num);
          const percentage = (Math.min(count, 9) / 9) * 100;
          return (
            <button
              key={num}
              className={`keypad-button ${count >= 9 ? 'completed' : ''}`}
              onClick={() => handleNumberClick(num)}
              disabled={isPaused}
              style={{
                background: `conic-gradient(#e5e5e5 ${percentage}%, #ffffff 0)`
              }}
            >
              <span className="digit-label">{num}</span>
            </button>
          );
        })}
        <button className="keypad-button clear" onClick={handleClearClick} disabled={isPaused}>
          ✕
        </button>
        <button 
          className="keypad-button history-btn redo-btn"
          onClick={redo}
          disabled={!canRedo || isPaused}
          title="Redo (Ctrl+Shift+Z)"
        >
          <div className="note-icon">↷</div>
          <div className="note-label">REDO</div>
        </button>

        {/* Row 3: Notes (Long) + Auto + Erase */}
        <button 
          className={`keypad-button note-toggle main-notes-btn ${isNoteMode ? 'active' : ''}`}
          onClick={toggleNoteMode}
          disabled={isPaused}
        >
          <div className="note-icon">{isNoteMode ? '📝' : '✏️'}</div>
          <div className="note-label">NOTE MODE: {isNoteMode ? 'ON' : 'OFF'}</div>
        </button>

        <button 
          className="keypad-button note-toggle auto-notes"
          onClick={fillAutoNotes}
          disabled={isPaused}
          title="Auto Fill All Notes"
        >
          <div className="note-icon">🪄</div>
          <div className="note-label">AUTO</div>
        </button>

        <button 
          className="keypad-button note-toggle erase-notes"
          onClick={clearAllNotes}
          disabled={isPaused}
          title="Erase All Notes"
        >
          <div className="note-icon">🧹</div>
          <div className="note-label">ERASE</div>
        </button>
      </div>
    </div>
  );
};
