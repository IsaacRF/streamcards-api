import { CardsServiceMongo } from './../services/cards-service-mongo';
import Logger from './../loaders/logger';
import { container } from "tsyringe";

/**
 * Dependency injector / provider
 */
export default () => {
    try {
        //Provide Cards Service
        container.register("CardsService", {
            useClass: CardsServiceMongo
        });
    } catch (e) {
        Logger.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
}