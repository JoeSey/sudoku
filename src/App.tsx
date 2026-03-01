import { useEffect } from 'react';
import { useGameStore } from './store/useGameStore';
import { SudokuGrid } from './components/grid/SudokuGrid';
import { Keypad } from './components/ui/Keypad';
import { GameInfo } from './components/ui/GameInfo';

function App() {
  const initGame = useGameStore((state) => state.initGame);
  const tickTimer = useGameStore((state) => state.tickTimer);
  const isPaused = useGameStore((state) => state.isPaused);
  const isGameWon = useGameStore((state) => state.isGameWon);
  const togglePause = useGameStore((state) => state.togglePause);

  useEffect(() => {
    initGame('easy');
  }, [initGame]);

  useEffect(() => {
    // 1-second interval loop calling tickTimer() ONLY if isPaused and isGameWon are false
    if (isPaused || isGameWon) return;

    const interval = setInterval(() => {
      tickTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, isGameWon, tickTimer]);

  useEffect(() => {
    // Visibility/Blur auto-pause
    const handleVisibilityChange = () => {
      if (document.hidden) {
        togglePause(true);
      }
    };

    const handleBlur = () => {
      togglePause(true);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [togglePause]);

  return (
    <div className="App" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      gap: '20px',
      backgroundColor: '#fff',
      color: '#000'
    }}>
      <h1 style={{ margin: 0, letterSpacing: '0.2em' }}>SUDOKU</h1>
      <GameInfo />
      <SudokuGrid />
      <Keypad />
    </div>
  )
}

export default App
