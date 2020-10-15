import { Router } from 'express';
import common from './routes/common';
import cards from './routes/cards';

/**
 * API default module.
 *
 * Guaranteed to get dependencies
 */
export default () => {
	const app = Router();
    common(app);
    cards(app);

	return app;
}