import express = require('express');
import Logger from './loaders/logger';

async function startServer() {
    const app: express.Application = express();

    await require('./loaders').default({ expressApp: app });

    //TODO: Move port to config
    //app.listen(config.port, (err) => {
    app.listen(3000, () => {
        console.log('Example app listening on port 3000!');
        Logger.info(`
            ################################################
            🛡️  Server listening on port: 3000 🛡️
            ################################################
        `);
    });
}

startServer();