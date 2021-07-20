import logger from './logger/logger.js';
import express from 'express';

import config from '../../config/backend/config.json';

import appRoute from './routes/app.js';
import apiRoute from './routes/api.js';

logger.debug(new Date().toUTCString());
logger.info(`\nHack4OpenGLAM Dashboard backend v${process.env.npm_package_version} ${process.env.NODE_ENV}`)

const app = express();

app.use('/', appRoute);
app.use('/api/', apiRoute);

app.listen(config.httpPort, () => {
    logger.info(`HTTP server is runinng on port ${config.httpPort}`);
});
