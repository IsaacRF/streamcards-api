import { EventDispatcher } from 'event-dispatch';
import { CardsService } from './../services/cards-service';
import {injectable, inject, singleton} from "tsyringe";
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
    ) {}

    async createCard(card: Card): Promise<Card> {
        const cardCreated = await this.cardsService.createCard(card);
        this.eventDispatcher.dispatch("onCardCreated", cardCreated);
        if (cardCreated.published) { this.eventDispatcher.dispatch("onCardPublished", cardCreated); }

        return cardCreated;
    }

    async getCard(id: string): Promise<Card> {
        return this.cardsService.getCard(id);
    }

    async updateCard(card: Card): Promise<Card> {
        const cardCreated = await this.cardsService.updateCard(card);
        if (cardCreated.published) { this.eventDispatcher.dispatch("onCardPublished", cardCreated); }

        return cardCreated;
    }

    async deleteCard(card: Card): Promise<Card> {
        return this.cardsService.deleteCard(card);
    }
}