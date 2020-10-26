import { CardsRepository } from './../../repositories/cards-repository';
import { Router, Request, Response, NextFunction } from 'express';
import { container } from "tsyringe";
import { Card } from '../../models/card';
import Logger from './../../loaders/logger';
import { isAuthOptional, isAuthRequired } from '../middlewares/isAuth';
const route = Router();

/**
 * Cards api routes
 */
export default (app: Router) => {
    const cardsRepository = container.resolve(CardsRepository);
    app.use('/cards', route);

    //Create card URL
    route.post('/',
        isAuthRequired,
        async function (req: Request, res: Response, next: NextFunction) {
            try {
                const card = await cardsRepository.createCard(req.user._id, req.body);
                res.status(200).json(card);
            } catch (e) {
                Logger.error('🔥 error: %o', e);
                return next(e);
            }
        });

    //Get card URL
    route.get('/:cardId',
        isAuthOptional,
        async function (req: Request, res: Response, next: NextFunction) {
            try {
                //TODO: Now using req.user._id obtained from auth, we can omit certain card details depending on logged user / no user logged
                const card = await cardsRepository.getCard(req.params.cardId);
                response(card, res);
            } catch (e) {
                Logger.error('🔥 error: %o', e);
                return next(e);
            }
        });

    //Get cards by owner URL
    route.get('/owner/:ownerId',
        isAuthOptional,
        async function (req: Request, res: Response, next: NextFunction) {
            try {
                //TODO: Now using req.user._id obtained from auth, we can omit certain card details depending on logged user / no user logged
                const cardsPerPage = Number(req.query.cardsPerPage) || 10;
                const lastCardId = req.query.lastCardId?.toString() || '';
                const cards = await cardsRepository.getCardsByOwner(req.params.ownerId, cardsPerPage, lastCardId);
                Logger.info(`Retrieving ${cardsPerPage} cards from card: ${lastCardId} from owner ${req.params.ownerId}`);

                const nextPageUrl = getNextPageUrl(req, cardsPerPage, cards);
                res.status(200).json({nextPageUrl, cards});
            } catch (e) {
                Logger.error('🔥 error: %o', e);
                return next(e);
            }
        });

    //Update card attributes URL
    route.put('/',
        isAuthRequired,
        async function (req: Request, res: Response, next: NextFunction) {
            try {
                //FIXME: Check if card to update is property of auth user to prevent impersonation
                const card = await cardsRepository.updateCard(req.body);
                response(card, res);
            } catch (e) {
                Logger.error('🔥 error: %o', e);
                return next(e);
            }
        });

    route.patch('/publish',
        isAuthRequired,
        async function (req: Request, res: Response, next: NextFunction) {
            try {
                //FIXME: Check if cards to publish are property of auth user to prevent impersonation
                const cards = await cardsRepository.changePublishedState(true, req.body);
                res.status(200).json(cards);
            } catch (e) {
                Logger.error('🔥 error: %o', e);
                return next(e);
            }
        });

    route.patch('/unpublish',
        isAuthRequired,
        async function (req: Request, res: Response, next: NextFunction) {
            try {
                //FIXME: Check if cards to unpublish are property of auth user to prevent impersonation
                const cards = await cardsRepository.changePublishedState(false, req.body);
                res.status(200).json(cards);
            } catch (e) {
                Logger.error('🔥 error: %o', e);
                return next(e);
            }
        });

    //Delete Card URL
    route.delete('/',
        isAuthRequired,
        async function (req: Request, res: Response, next: NextFunction) {
            try {
                //FIXME: Check if card to delete is property of auth user to prevent impersonation
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

    /**
     * Helper func to get next page URL
     * @param req Request
     * @param cardsPerPage Number of cards per page
     * @param cards Cards returned in the query to get the last card ID
     */
    function getNextPageUrl(req: Request, cardsPerPage: number, cards: Card[]) : string {
        const lastCardId = cards[cards.length-1]._id;
        return `${req.protocol}://${req.hostname}${req.baseUrl}${req.path}?cardsPerPage=${cardsPerPage}&lastCardId=${lastCardId}`;
    }
}