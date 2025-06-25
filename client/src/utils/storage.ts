const STORAGE_KEY = 'traumba_cards';

export function saveCardsToStorage(cards: any[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function loadCardsFromStorage(): any[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
