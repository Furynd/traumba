// src/types/card.ts
export type CardType = 'dream' | 'goal' | 'todo' | 'habit' | 'reward';

export interface CardData {
  id: string;           // unique ID
  type: CardType;
  title: string;
  description?: string;
}