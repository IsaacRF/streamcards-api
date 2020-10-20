import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    /**
     * Server config
     */
    server: {
        port: parseInt(process.env.PORT!, 10),
    },
    /**
     * API configs
     */
    api: {
        prefix: '/api',
        jwtSecret: process.env.JWT_SECRET
    },
    /**
     * Database URL
     */
    databaseURL: process.env.MONGODB_URI,
    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
}