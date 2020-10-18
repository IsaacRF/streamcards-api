import { Card } from './../models/card';
import { EventSubscriber, On } from "event-dispatch";
import events from "./events";
import Logger from './../loaders/logger';

@EventSubscriber()
export default class CardEventSubscriber {
    @On(events.card.created)
    public onCardCreated(card: Card) {
        try {
            Logger.info(`⭐ [Event] Card created: ${card.name} / ${card.rarity}`);
            //gaAnalytics.event('card_created', card);
            //otherPlatform.event('card_created', card);
        } catch (e) {
            Logger.info(`⭐🔥 Event Error on Card created: ${card.name} / ${card.rarity}`);
        }
    }

    @On(events.card.published)
    public onCardPublished(card: Card) {
        try {
            Logger.info(`⭐ [Event] Card published: ${card.name}`);
            //gaAnalytics.event('card_published', card);
            //otherPlatform.event('card_published', card);
        } catch (e) {
            Logger.info(`⭐🔥 Event Error on Card published: ${card.name}`);
        }
    }
}