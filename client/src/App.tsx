import React, { useEffect, useState } from 'react';
import { loadCardsFromStorage, saveCardsToStorage } from './utils/storage';
import { Card } from './components/Card';
import type { CardData } from './types/card';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from './components/Modal';
import { CardForm } from './components/CardForm';

const App = () => {
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    const loaded = loadCardsFromStorage();
    setCards(loaded);

    const onStorageChange = (e: StorageEvent) => {
      if (e.key === 'traumba_cards') {
        setCards(loadCardsFromStorage());
      }
    };
    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, []);

  const deleteCard = (id: string) => {
    setCards((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      saveCardsToStorage(updated);
      return updated;
    });
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CardData | null>(null);

  const openNewCard = () => {
    setEditingCard(null);
    setModalOpen(true);
  };

  const editCard = (card: CardData) => {
    setEditingCard(card);
    setModalOpen(true);
  };

  const saveCard = (newCard: CardData) => {
    setCards((prev) => {
      const exists = prev.find((c) => c.id === newCard.id);
      const updated = exists
        ? prev.map((c) => (c.id === newCard.id ? newCard : c))
        : [...prev, newCard];

      saveCardsToStorage(updated);
      return updated;
    });

    setModalOpen(false);
  };

  const renderTree = (parentId?: string) => {
    return cards
      .filter((card) => card.parentId === parentId)
      .map((card) => (
        <div key={card.id} className="relative ml-4 mt-2 border-l-2 pl-2">
          <Card card={card} onClick={() => editCard(card)} />
          <button
            onClick={() => deleteCard(card.id)}
            className="absolute top-2 right-2 bg-white text-red-500 text-xs rounded px-2 py-0.5 shadow"
          >
            ✕
          </button>
          {renderTree(card.id)}
        </div>
      ));
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

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="relative">
            <Card key={card.id} card={card} onClick={() => editCard(card)} />
          </div>
        ))}
      </div> */}

      {renderTree(undefined)}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
      <CardForm
        initial={editingCard ?? {}}
        allCards={cards}
        onSave={saveCard}
        onCancel={() => setModalOpen(false)}
      />
      </Modal>
    </div> 
  );
};

export default App;
