import React, { useState } from 'react';
import type { CardData, CardType } from '../types/card';
import { getDescendantIds } from '../utils/tree';

interface CardFormProps {
  initial?: Partial<CardData>;
  allCards: CardData[];
  onSave: (data: CardData) => void;
  onCancel: () => void;
}

export const CardForm: React.FC<CardFormProps> = ({ initial = {}, allCards, onSave, onCancel }) => {
  const [title, setTitle] = useState(initial.title ?? '');
  const [description, setDescription] = useState(initial.description ?? '');
  const [type, setType] = useState<CardType>(initial.type ?? 'todo');
  const [parentId, setParentId] = useState(initial.parentId ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: initial.id ?? crypto.randomUUID(),
      title,
      description,
      type,
      parentId: parentId || undefined,
    });
  };

  const invalidParentIds = initial.id ? getDescendantIds(allCards, initial.id) : [];
  invalidParentIds.push(initial.id ?? ''); // disallow self

  const validParentOptions = allCards.filter(
    (card) => !invalidParentIds.includes(card.id)
  );

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          value={type}
          onChange={(e) => setType(e.target.value as CardType)}
        >
          {(['dream', 'goal', 'todo', 'habit', 'reward'] as CardType[]).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {type !== 'dream' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Parent Card</label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
          >
            <option value="">Select parent</option>
            {validParentOptions.map((card) => (
              <option key={card.id} value={card.id}>
                {card.title} ({card.type})
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};
