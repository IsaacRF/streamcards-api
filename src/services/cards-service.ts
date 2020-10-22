import { Card } from './../models/card';

/**
 * Cards CRUD operations
 */
export interface CardsService {
    /**
     * Creates a card using specified info
     * @param card Card to create
     */
    createCard(card: Card): Promise<Card>;
    /**
     * Retrieves a card by ID
     * @param id Card ID
     */
    getCard(id: string): Promise<Card>;
    /**
     * Get cards from an specific owner with efficient pagination
     * @param ownerId Owner ID
     * @param cardsPerPage Limit of cards per page
     * @param lastCardId ID from the last card of the previous page for pagination
     */
    getCards(ownerId: string, cardsPerPage: number, lastCardId: string): Promise<Card[]>
    /**
     * Updates a card (located via ID) with the specified info
     * @param card Card to update
     */
    updateCard(card: Card): Promise<Card>;
    /**
     * Deletes specified card
     * @param card
     */
    deleteCard(card: Card): Promise<Card>;
}