import { Card } from './card';
import mongoose from 'mongoose'
import { Rarity } from './rarity';

/**
 * Card MongoDB implementation
 */
const CardMongo = new mongoose.Schema(
    {
        name: {
            type: String,
            index: true,
            required: [
                function(this: void) { return ((this as unknown) as Card).published; },
                'Card name is required when published state is true'
            ]
        },
        //TODO: Add image to schema
        //image: Buffer,
        rarity: {
            type: String,
            enum: Object.values(Rarity),
            default: Rarity.Normal,
            required: [
                function(this: void) { return ((this as unknown) as Card).published; },
                'Card rarity is required when published state is true'
            ]
        },
        limited: {
            type: Boolean,
            default: false
        },
        numberAvailable: {
            type: Number,
            required: [
                function(this: void) { return ((this as unknown) as Card).limited; },
                'Number of cards available is required when card type is limited'
            ]
        },
        published: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

export default mongoose.model<Card & mongoose.Document>('Card', CardMongo);