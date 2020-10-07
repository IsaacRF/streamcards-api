import express from 'express'
import expressLoader from './express';
import Logger from './logger';

/**
 * Loaders default module
 */
export default async ({ expressApp }: {expressApp: express.Application}) => {

    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
};