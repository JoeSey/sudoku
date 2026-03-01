import React from 'react';
import classNames from 'classnames';

interface PencilGridProps {
  notes: number[];
  highlightValue?: number | null;
}

export const PencilGrid: React.FC<PencilGridProps> = ({ notes, highlightValue }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="pencil-grid">
      {numbers.map((num) => (
        <div
          key={num}
          className={classNames('pencil-note', {
            'visible': notes.includes(num),
            'hidden': !notes.includes(num),
            'highlighted': highlightValue === num,
          })}
        >
          {num}
        </div>
      ))}
    </div>
  );
};
