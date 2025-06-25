// src/types/card.ts
export type CardType = 'dream' | 'goal' | 'todo' | 'habit' | 'reward' | 'currency';

export interface CardData {
  id: string;           // unique ID
  type: CardType;
  title: string;
  description?: string;
  parentId?: string;
}