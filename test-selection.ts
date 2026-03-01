import { useGameStore } from './src/store/useGameStore';
useGameStore.getState().setSelection([0, 1, 2]);
if (useGameStore.getState().selectedIndices.length !== 3) {
  console.error('Multi-selection length mismatch', useGameStore.getState().selectedIndices.length);
  process.exit(1);
}
console.log('Multi-selection success');
process.exit(0);
