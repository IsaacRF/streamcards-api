import { Card } from './../models/card';
import CardMongo from '../models/card-mongo'
import { CardsService } from './cards-service';

/**
 * Cards CRUD operations MongoDB implementation
 */
export class CardsServiceMongo implements CardsService {
    async createCard(card: Card): Promise<Card> {
        await CardMongo.create(card);
        return card;
    }

    async getCard(id: number): Promise<Card> {
        throw new Error('Method not implemented.');
    }

    async updateCard(card: Card): Promise<Card> {
        throw new Error('Method not implemented.');
    }

    async deleteCard(card: Card): Promise<Card> {
        throw new Error('Method not implemented.');
    }
}