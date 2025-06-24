import React, { useState } from 'react';
import { Card } from './components/Card';
import type { CardData } from './types/card';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from './components/Modal';
import { CardForm } from './components/CardForm';

const App = () => {
  const [cards, setCards] = useState<CardData[]>([
    {
      id: uuidv4(),
      type: 'dream',
      title: 'Rule the World',
      description: 'nothing is impossible',
    },
  ]);

  const deleteCard = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CardData | null>(null);

  const openNewCard = () => {
    setEditingCard(null);
    setModalOpen(true);
  };

  const openEditCard = (card: CardData) => {
    setEditingCard(card);
    setModalOpen(true);
  };

  const saveCard = (data: Omit<CardData, 'id'>) => {
    if (editingCard) {
      setCards((prev) =>
        prev.map((c) => (c.id === editingCard.id ? { ...editingCard, ...data } : c))
      );
    } else {
      setCards((prev) => [...prev, { id: uuidv4(), ...data }]);
    }
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Traumba: Card Deck</h1>

      <div className="flex gap-2 mb-4">
        <button
          className="bg-green-600 text-white px-3 py-1 rounded"
          onClick={openNewCard}
        >
          + New Card
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="relative">
            <Card {...card} />
            <button
              onClick={() => deleteCard(card.id)}
              className="absolute top-2 right-2 bg-white text-red-500 text-xs rounded px-2 py-0.5 shadow"
            >
              ✕
            </button>
            <button
              onClick={() => openEditCard(card)}
              className="absolute bottom-2 right-2 bg-white text-blue-500 text-xs rounded px-2 py-0.5 shadow"
            >
              ✎
            </button>
          </div>
        ))}
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
      <CardForm
        initial={editingCard ?? {}}
        onSave={saveCard}
        onCancel={() => setModalOpen(false)}
      />
      </Modal>
    </div> 
  );
};

export default App;
