import express from 'express'
import expressLoader from './express';
import mongooseLoader from './mongoose';
import Logger from './logger';

/**
 * Loaders default module
 */
export default async ({ expressApp }: { expressApp: express.Application }) => {

    await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');

    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
};