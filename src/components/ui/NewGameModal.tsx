import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Difficulty } from '../../types';
import classNames from 'classnames';

interface NewGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: (difficulty: Difficulty, useSymmetry: boolean) => void;
}

const formatTime = (seconds: number | null) => {
  if (seconds === null) return '--:--';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const NewGameModal: React.FC<NewGameModalProps> = ({ isOpen, onClose, onStartGame }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');
  const initialSymmetry = useGameStore.getState().useSymmetry;
  const [useSymmetry, setUseSymmetry] = useState(initialSymmetry);
  const [showConfirm, setShowConfirm] = useState(false);
  const grid = useGameStore((state) => state.grid);
  const bestTimes = useGameStore((state) => state.bestTimes);
  const isGameWon = useGameStore((state) => state.isGameWon);

  if (!isOpen) return null;

  const hasProgress = !isGameWon && grid.some(cell => !cell.fixed && cell.value !== null);

  const handleStart = () => {
    if (hasProgress) {
      setShowConfirm(true);
    } else {
      onStartGame(selectedDifficulty, useSymmetry);
      onClose();
    }
  };

  const confirmStart = () => {
    onStartGame(selectedDifficulty, useSymmetry);
    setShowConfirm(false);
    onClose();
  };

  const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'expert'];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {!showConfirm ? (
          <>
            <h2 className="modal-heading">New Game</h2>
            
            <div style={{ marginBottom: '2rem' }}>
              {difficulties.map((diff) => (
                <div
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={classNames('diff-select-item', {
                    'active': selectedDifficulty === diff
                  })}
                >
                  <span className="label">{diff}</span>
                  <div className="meta">
                    <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>BEST TIME</div>
                    <div style={{ fontFamily: 'monospace', display: 'flex', gap: '4px', alignItems: 'center' }}>
                      {formatTime(bestTimes[diff]?.time ?? null)}
                      {bestTimes[diff]?.autoNotes && <span className="badge-auto" title="Auto Notes Used" style={{ fontSize: '0.6rem', padding: '1px 3px', border: '1px solid #ddd', borderRadius: '2px', lineHeight: 1 }}>AUTO</span>}
                      {bestTimes[diff]?.isAssisted && <span className="badge-hint" title="Logic Hint Used" style={{ fontSize: '0.6rem', padding: '1px 3px', border: '1px solid #ddd', borderRadius: '2px', lineHeight: 1, backgroundColor: '#fdf2f2', color: '#991b1b' }}>HINT</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.25rem' }}>
              <input 
                type="checkbox" 
                id="symmetry" 
                style={{ width: '1rem', height: '1rem' }} 
                checked={useSymmetry}
                onChange={(e) => setUseSymmetry(e.target.checked)}
              />
              <label htmlFor="symmetry" style={{ fontSize: '0.875rem', color: '#4b5563', cursor: 'pointer' }}>Rotational Symmetry</label>
            </div>

            <div className="flex-gap">
              <button
                onClick={onClose}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleStart}
                className="btn btn-primary"
              >
                Start
              </button>
            </div>
          </>
        ) : (
          <div style={{ padding: '1rem 0' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase' }}>Discard Progress?</h3>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Your current game progress will be lost. Are you sure you want to start a new game?</p>
            <div className="flex-gap">
              <button
                onClick={() => setShowConfirm(false)}
                className="btn btn-secondary"
              >
                Back
              </button>
              <button
                onClick={confirmStart}
                className="btn btn-danger"
              >
                Start New
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
