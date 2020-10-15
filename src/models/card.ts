import { Rarity } from './rarity'

/**
 * Card concept abstraction
 */
export interface Card {
    _id: string,
    name: string;
    //TODO: Add image to interface
    //image: Buffer;
    rarity: Rarity;
    limited: boolean;
    numberAvailable: number;
    published: boolean;
}