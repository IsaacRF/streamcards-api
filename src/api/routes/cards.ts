import { CardsRepository } from './../../repositories/cards-repository';
import { Router, Request, Response, NextFunction } from 'express';
import { container } from "tsyringe";
import { Card } from '../../models/card';
import Logger from './../../loaders/logger';
const route = Router();

/**
 * Cards api routes
 */
export default (app: Router) => {
    const cardsRepository = container.resolve(CardsRepository);
    app.use('/cards', route);

    //Create card URL
    route.post('/',
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
    route.get('/:cardId',
        async function (req: Request, res: Response, next: NextFunction) {
            try {
                const card = await cardsRepository.getCard(req.params.cardId);
                response(card, res);
            } catch (e) {
                Logger.error('🔥 error: %o', e);
                return next(e);
            }
        });

    route.put('/',
        async function (req: Request, res: Response, next: NextFunction) {
            try {
                const card = await cardsRepository.updateCard(req.body);
                response(card, res);
            } catch (e) {
                Logger.error('🔥 error: %o', e);
                return next(e);
            }
        });

    route.delete('/',
        async function (req: Request, res: Response, next: NextFunction) {
            try {
                const card = await cardsRepository.deleteCard(req.body);
                response(card, res);
            } catch (e) {
                Logger.error('🔥 error: %o', e);
                return next(e);
            }
        });

    /**
     * Helper func to handle response and errors for not found card
     *
     * @param card Card returned from call. Null if not found or not updated / deleted
     * @param res Response
     */
    function response(card: Card, res: Response) {
        if (card == null) {
            let e = new Error();
            e.name = "CardNotFound";
            throw (e)
        } else {
            res.status(200).json(card);
        }
    }
}