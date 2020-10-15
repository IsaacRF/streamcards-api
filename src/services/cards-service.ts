import { Card } from './../models/card';

/**
 * Cards CRUD operations
 */
export interface CardsService {
    createCard(card: Card): Promise<Card>;
    getCard(id: number): Promise<Card>;
    updateCard(card: Card): Promise<Card>;
    deleteCard(card: Card): Promise<Card>;
}