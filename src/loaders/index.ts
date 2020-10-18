import "reflect-metadata";
import express from 'express'
import expressLoader from './express';
import mongooseLoader from './mongoose';
import Logger from './logger';
import dependencyInjector from "./dependency-injector";
//Must be imported once so they can be triggered
import './events';

/**
 * Loaders default module
 */
export default async ({ expressApp }: { expressApp: express.Application }) => {

    await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');

    await dependencyInjector();
    Logger.info('✌️ Dependencies Injected');

    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
};