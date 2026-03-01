import { useGameStore } from './src/store/useGameStore';

try {
  useGameStore.getState().initGame('easy');
  const grid = useGameStore.getState().grid;
  if (grid.length !== 81) {
    console.error('Grid length is not 81');
    process.exit(1);
  }
  
  const hasValues = grid.some(cell => cell.value !== null);
  if (!hasValues) {
    console.error('Grid is empty');
    process.exit(1);
  }

  const fixedCells = grid.filter(cell => cell.fixed);
  if (fixedCells.length === 0) {
     console.error('No fixed cells found');
     process.exit(1);
  }

  console.log('Grid init success');
  process.exit(0);
} catch (error) {
  console.error('Error during store initialization:', error);
  process.exit(1);
}
