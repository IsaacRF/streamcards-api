import { CardsServiceMongo } from './../services/cards-service-mongo';
import { container } from "tsyringe";
import { EventDispatcher } from "event-dispatch";
import Logger from './../loaders/logger';

/**
 * Dependency injector / provider
 */
export default async () => {
    try {
        //Provide Cards Service
        container.register("CardsService", {
            useClass: CardsServiceMongo
        });

        //Provide EventDispatcher Instance
        container.registerInstance("EventDispatcher", new EventDispatcher());
    } catch (e) {
        Logger.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
}