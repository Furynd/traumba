import React from 'react';
import type { CardData } from '../types/card';
import clsx from 'clsx';

const typeStyles: Record<CardData['type'], string> = {
  dream: 'border-purple-500 bg-gradient-to-br from-purple-100 to-white',
  goal: 'border-blue-500 bg-gradient-to-br from-blue-100 to-white',
  todo: 'border-green-500 bg-gradient-to-br from-green-100 to-white',
  habit: 'border-yellow-500 bg-gradient-to-br from-yellow-100 to-white',
  reward: 'border-pink-500 bg-gradient-to-br from-pink-100 to-white',
  currency: 'border-black-500 bg-gradient-to-br from-black-100 to-white',
};

interface CardProps {
  card: CardData;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'relative p-4 rounded-xl border-4 shadow-lg cursor-pointer transition-transform transform hover:scale-105',
        typeStyles[card.type]
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-bold uppercase tracking-wider text-gray-700">
          {card.type}
        </span>
        <span className="text-xs text-gray-500 italic"># {card.id.slice(0, 6)}</span>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-1">{card.title}</h3>

      {card.description && (
        <p className="text-sm text-gray-800 whitespace-pre-line">{card.description}</p>
      )}
    </div>
  );
};
