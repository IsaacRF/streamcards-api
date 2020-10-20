import { Card } from './card';
import mongoose, { Schema } from 'mongoose';
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
        image: {
            type: String,
            required: [
                function(this: void) { return ((this as unknown) as Card).published; },
                'Card image is required when published state is true'
            ],
            validate: [
                function(image) {
                    const urlRegex = /(ftp|http|https):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/;
                    return urlRegex.test(image);
                },
                'Card image URL is in a wrong format'
            ],
        },
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
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, "Owner ID is required in card creation"]
        }
    },
    { timestamps: true }
);

export default mongoose.model<Card & mongoose.Document>('Card', CardMongo);