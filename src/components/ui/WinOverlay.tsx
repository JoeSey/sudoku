import React from 'react';
import { useGameStore } from '../../store/useGameStore';

interface WinOverlayProps {
  onNewGame: () => void;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const WinOverlay: React.FC<WinOverlayProps> = ({ onNewGame }) => {
  const timer = useGameStore((state) => state.timer);
  const mistakeCount = useGameStore((state) => state.mistakeCount);
  const difficulty = useGameStore((state) => state.difficulty);
  const isGameWon = useGameStore((state) => state.isGameWon);
  const isAutoNotesUsed = useGameStore((state) => state.isAutoNotesUsed);
  const isAssisted = useGameStore((state) => state.isAssisted);

  if (!isGameWon) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-heading">Puzzle Solved</h2>
        
        <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
          <p className="stat-row">
            <span>Difficulty</span>
            <span className="stat-value" style={{ textTransform: 'capitalize' }}>{difficulty}</span>
          </p>
          <p className="stat-row">
            <span>Time</span>
            <span className="stat-value">
              {formatTime(timer)}
              {isAutoNotesUsed && <span className="badge-auto" title="Auto Notes Used">AUTO</span>}
              {isAssisted && <span className="badge-hint" title="Logic Hint Used">HINT</span>}
            </span>
          </p>
          <p className="stat-row" style={{ borderBottom: 'none' }}>
            <span>Mistakes</span>
            <span className="stat-value">{mistakeCount}</span>
          </p>
        </div>

        <button
          onClick={onNewGame}
          className="btn btn-primary"
        >
          New Game
        </button>
      </div>
    </div>
  );
};
