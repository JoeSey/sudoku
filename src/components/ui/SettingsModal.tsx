import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { HighlightColor } from '../../types';
import classNames from 'classnames';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const settings = useGameStore((state) => state.settings);
  const updateSettings = useGameStore((state) => state.updateSettings);

  if (!isOpen) return null;

  const colors: HighlightColor[] = ['gray', 'blue', 'green', 'red'];

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '400px' }}>
        <h2 className="modal-heading">Settings</h2>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#666' }}>
            NORMAL HIGHLIGHT COLOR
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => updateSettings({ normalHighlightColor: color })}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: color === 'gray' ? '#e0e0e0' : (color === 'blue' ? '#3b82f6' : (color === 'green' ? '#22c55e' : '#ef4444')),
                  border: settings.normalHighlightColor === color ? '3px solid #000' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  transform: settings.normalHighlightColor === color ? 'scale(1.1)' : 'scale(1)'
                }}
                title={color}
              />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#666' }}>
            ZEN HIGHLIGHT COLOR
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => updateSettings({ zenHighlightColor: color })}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: color === 'gray' ? '#e0e0e0' : (color === 'blue' ? '#3b82f6' : (color === 'green' ? '#22c55e' : '#ef4444')),
                  border: settings.zenHighlightColor === color ? '3px solid #000' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  transform: settings.zenHighlightColor === color ? 'scale(1.1)' : 'scale(1)'
                }}
                title={color}
              />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '0.25rem' }}>
          <label htmlFor="showHint" style={{ fontSize: '0.875rem', color: '#4b5563', cursor: 'pointer' }}>Show Hint Button</label>
          <input 
            type="checkbox" 
            id="showHint" 
            style={{ width: '1.25rem', height: '1.25rem' }} 
            checked={settings.showHintButton}
            onChange={(e) => updateSettings({ showHintButton: e.target.checked })}
          />
        </div>

        <button
          onClick={onClose}
          className="btn btn-primary"
          style={{ width: '100%' }}
        >
          Close
        </button>
      </div>
    </div>
  );
};
