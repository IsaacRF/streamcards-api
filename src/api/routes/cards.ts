import { CardsServiceMongo } from './../../services/cards-service-mongo';
import { CardsService } from './../../services/cards-service';
import { Router, Request, Response, NextFunction } from 'express';
import Logger from './../../loaders/logger';
const route = Router();

/**
 * Cards api routes
 */
export default (app: Router) => {
    app.use('/cards', route);

    //Create card URL
    route.post('/create',
        async function (req: Request, res: Response, next: NextFunction) {
            try {
                //TODO: Inject this
                const cardDTO = req.body;
                let service: CardsServiceMongo = new CardsServiceMongo();
                const card = await service.createCard(cardDTO);

                res.status(200).json(card);
            } catch (e) {
                Logger.error('🔥 error: %o',  e );
                return next(e);
            }
        });

    //Get card URL
    route.get('/:cardId', function (req, res) {
        res
            .status(200)
            .send(`TEST. Requesting info from card ${req.params.cardId}`);
    });
}