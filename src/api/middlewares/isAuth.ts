//import jwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import { Request, NextFunction } from 'express';
import config from '../../config';
import Logger from './../../loaders/logger';

/**
 * Instructions to extract token from request headers
 * @param req
 */
function getTokenFromHeader(req: Request): string {
    if (
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    ) {
        return req.headers.authorization.split(' ')[1];
    }
    return "";
}

/**
 * Enforces valid jwt auth, fails on verify errors.
 *
 * On success, stores auth info on req.user
 * @param req
 * @param res
 * @param next
 */
export const isAuthRequired = async function (req: any, res: any, next: any) {
    try {
        const tokenInfo = jwt.verify(getTokenFromHeader(req), config.api.jwtSecret!);
        req.user = tokenInfo;
        Logger.info(`🔒 Auth: ${req.user?.name} / ${req.user?._id}`);

        return next();
    } catch (e) {
        Logger.error(`🔒🔥 Auth Error: ${e.message}`);
        e.name = "InvalidAuth";
        return next(e);
    }
}

/**
 * Optional auth, moves on if jwt verifying fails. This method is used to allow
 * access to api read enpoints without auth, but with limited info access.
 *
 * On success, stores auth info on req.user.
 * @param req
 * @param res
 * @param next
 */
export const isAuthOptional = async function (req: any, res: any, next: any) {
    try {
        const tokenInfo = jwt.verify(getTokenFromHeader(req), config.api.jwtSecret!);
        req.user = tokenInfo;
        Logger.info(`🔒 Auth: ${req.user?.name} / ${req.user?._id}`);

        return next();
    } catch (e) {
        Logger.error(`🔒🔥 Auth Error: ${e.message}`);
        //Move on, auth is optional
        return next();
    }
}
