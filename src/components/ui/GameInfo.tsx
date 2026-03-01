import React from 'react';
import { useGameStore } from '../../store/useGameStore';

interface GameInfoProps {
  onNewGame: () => void;
}

export const GameInfo: React.FC<GameInfoProps> = ({ onNewGame }) => {
  const timer = useGameStore((state) => state.timer);
  const mistakeCount = useGameStore((state) => state.mistakeCount);
  const difficulty = useGameStore((state) => state.difficulty);
  const isPaused = useGameStore((state) => state.isPaused);
  const isZenMode = useGameStore((state) => state.isZenMode);
  const togglePause = useGameStore((state) => state.togglePause);
  const toggleZenMode = useGameStore((state) => state.toggleZenMode);
  const showHint = useGameStore((state) => state.showHint);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-info" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      width: '100%',
      maxWidth: '500px',
      margin: '0 auto',
      padding: '0 10px',
      fontFamily: 'monospace',
      fontSize: '0.9rem',
      textTransform: 'uppercase',
      color: '#666'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button 
            onClick={onNewGame}
            className="hover:text-black transition-colors"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textTransform: 'uppercase', font: 'inherit' }}
          >
            New Game
          </button>
          <span style={{ color: '#000', fontWeight: 'bold' }}>{difficulty}</span>
          <button 
            onClick={toggleZenMode}
            className={isZenMode ? 'text-black font-bold' : 'hover:text-black transition-colors'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textTransform: 'uppercase', font: 'inherit' }}
          >
            {isZenMode ? 'ZEN: ON' : 'ZEN: OFF'}
          </button>
          <button 
            onClick={showHint}
            className="hover:bg-purple-50 transition-colors"
            title="Get Logic Hint"
            style={{ 
              background: '#f5f3ff', 
              border: '1px solid #7c3aed', 
              borderRadius: '50%', 
              cursor: 'pointer', 
              width: '24px',
              height: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '0.8rem', 
              fontWeight: 'bold',
              color: '#7c3aed'
            }}
          >
            ?
          </button>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {!isZenMode && (
            <span>Mistakes: <span style={{ color: mistakeCount > 0 ? '#000' : 'inherit' }}>{mistakeCount}</span></span>
          )}
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            {!isZenMode && (
              <span style={{ color: '#000', fontWeight: 'bold', fontSize: '0.8rem', lineHeight: 1 }}>{formatTime(timer)}</span>
            )}
            <button 
              onClick={() => togglePause()}
              className="hover:text-black transition-colors"
              style={{
                background: 'none',
                border: '1px solid #ddd',
                borderRadius: '3px',
                cursor: 'pointer',
                padding: '2px 6px',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                lineHeight: 1
              }}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
