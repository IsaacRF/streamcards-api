import { EventDispatcher } from 'event-dispatch';
import { CardsService } from './../services/cards-service';
import { injectable, inject, singleton } from "tsyringe";
import { Card } from '../models/card';

/**
 * Cards data management layer
 *
 * [NOTE]: This layer could seem overcoding in this example where only CRUD service operations are
 * performed. In a larger project, this layer would act as a data access abstraction layer, that could
 * consume from various data sources, etc. without altering the components using it
 */
@injectable()
@singleton()
export class CardsRepository {
    constructor(
        @inject("CardsService") private cardsService: CardsService,
        @inject("EventDispatcher") private eventDispatcher: EventDispatcher
    ) { }

    /**
     * Creates a card
     *
     * [Events]:
     * - onCardPublished: Fired if card is published
     *
     * @param card Card to create
     */
    async createCard(card: Card): Promise<Card> {
        const cardCreated = await this.cardsService.createCard(card);
        this.eventDispatcher.dispatch("onCardCreated", cardCreated);
        if (cardCreated.published) { this.eventDispatcher.dispatch("onCardPublished", cardCreated); }

        return cardCreated;
    }

    /**
     * Retrieves a card by its id
     * @param id Card id
     */
    async getCard(id: string): Promise<Card> {
        return this.cardsService.getCard(id);
    }

    /**
     * Retrieves all cards from an specific owner
     * @param ownerId Owner user ID
     * @param cardsPerPage Number of cards retrieved for every page
     * @param lastCardId Last card from previous query ID for efficient pagination
     */
    async getCardsByOwner(ownerId: string, cardsPerPage: number, lastCardId: string): Promise<Card[]> {
        return this.cardsService.getCards(ownerId, cardsPerPage, lastCardId);
    }

    /**
     * Updates all attributes of a card
     *
     * [Events]:
     * - onCardPublished: Fired if card is published
     *
     * @param card Card to update
     */
    async updateCard(card: Card): Promise<Card> {
        const cardCreated = await this.cardsService.updateCard(card);
        if (cardCreated.published) { this.eventDispatcher.dispatch("onCardPublished", cardCreated); }

        return cardCreated;
    }

    /**
     * Changes published state without altering any other card attribute
     * @param isPublished Published state to change to
     * @param cards List of cards to publish / unpublish
     */
    async changePublishedState(isPublished: boolean, cards: Card[]): Promise<Card[]> {
        let updatedCards: Card[] = [];

        for (let card of cards) {
            const cardToUpdate = await this.getCard(card._id)
            cardToUpdate.published = isPublished;
            await this.updateCard(cardToUpdate);

            updatedCards.push(cardToUpdate);
        }

        return updatedCards;
    }

    /**
     * Deletes a card
     * @param card Card to delete
     */
    async deleteCard(card: Card): Promise<Card> {
        return this.cardsService.deleteCard(card);
    }
}