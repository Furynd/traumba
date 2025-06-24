import React from 'react';
import clsx from 'clsx';

type CardProps = {
  title: string;
  type: 'dream' | 'goal' | 'todo' | 'habit' | 'reward';
  description?: string;
  color?: string;
};

const typeColors: Record<CardProps['type'], string> = {
  dream: 'bg-purple-500',
  goal: 'bg-blue-500',
  todo: 'bg-green-500',
  habit: 'bg-yellow-500',
  reward: 'bg-pink-500',
};

export const Card: React.FC<CardProps> = ({
  title,
  type,
  description,
  color,
}) => {
  return (
    <div
      className={clsx(
        'rounded-xl shadow-md p-4 w-60 h-36 text-white flex flex-col justify-between',
        color || typeColors[type]
      )}
    >
      <div className="font-bold text-lg">{title}</div>
      {description && <div className="text-sm">{description}</div>}
      <div className="text-xs italic opacity-75 text-right">[{type}]</div>
    </div>
  );
};
