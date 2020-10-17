import { Card } from './../models/card';
import CardMongo from '../models/card-mongo'
import { CardsService } from './cards-service';

/**
 * Cards CRUD operations MongoDB implementation
 */
export class CardsServiceMongo implements CardsService {
    async createCard(card: Card): Promise<Card> {
        const cardCreated = await CardMongo.create(card);
        return cardCreated;
    }

    async getCard(id: string): Promise<Card> {
        const card = await CardMongo.findById(id);
        return card as Card;
    }

    async updateCard(card: Card): Promise<Card> {
        const cardUpdated = await CardMongo.findByIdAndUpdate(card._id, card, {new: true});
        return cardUpdated as Card;
    }

    async deleteCard(card: Card): Promise<Card> {
        const cardDeleted = await CardMongo.findByIdAndDelete(card._id);
        return cardDeleted as Card;
    }
}