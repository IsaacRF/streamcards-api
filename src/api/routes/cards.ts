import { CardsRepository } from './../../repositories/cards-repository';
import { Router, Request, Response, NextFunction } from 'express';
import { container } from "tsyringe";
import Logger from './../../loaders/logger';
const route = Router();

/**
 * Cards api routes
 */
export default (app: Router) => {
    const cardsRepository = container.resolve(CardsRepository);
    app.use('/cards', route);

    //Create card URL
    route.post('/create',
        async function (req: Request, res: Response, next: NextFunction) {
            try {
                const card = await cardsRepository.createCard(req.body);
                res.status(200).json(card);
            } catch (e) {
                Logger.error('🔥 error: %o', e);
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