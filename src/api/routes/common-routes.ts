import { Router, Request, Response } from 'express';
const route = Router();

/**
 * Common routes
 */
export default (app: Router) => {
    app.use('/', route);

    //Main URL
    route.get('/', function (req, res) {
        res
            .status(200)
            .send('Streamcards API is working!');
    });
}