import express = require('express');
import Logger from './loaders/logger';
import config from './config';

async function startServer() {
    const app: express.Application = express();

    await require('./loaders').default({ expressApp: app });

    app.listen(config.server.port, () => {
        Logger.info(`
            ################################################
            🛡️  Server listening on port: ${config.server.port} 🛡️
            ################################################
        `);
    }).on('error', () => {
        Logger.error('❌ Server Init Error');
    });
}

startServer();