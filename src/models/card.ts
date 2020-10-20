import { Rarity } from './rarity'

/**
 * Card concept abstraction
 */
export interface Card {
    _id: string,
    name: string;
    image: string;
    rarity: Rarity;
    limited: boolean;
    numberAvailable: number;
    published: boolean;
    owner: string;
}