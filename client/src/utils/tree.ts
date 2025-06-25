import { CardData } from '../types/card';

export function getDescendantIds(cards: CardData[], parentId?: string): string[] {
    const descendants: string[] = [];

    const find = (id: string) => {
        const children = cards.filter((card) => card.parentId === id);
        for (const child of children) {
            descendants.push(child.id);
            find(child.id); // Recursively find descendants
        }
    };

    find(parentId || '');
    return descendants;
}