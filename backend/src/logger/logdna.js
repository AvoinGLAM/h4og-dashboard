import Logger from 'logdna';
import config from '../../../config/config.json';
import * as defaultLogger from './default.js';
import os from 'os';

let logger;

export const createLogger = () => {
    defaultLogger.info("Creating a logdna logger...");
    logger = Logger.createLogger(config.logdnaKey, {
        hostname: os.hostname(),
        app: 'h4og-dashboard',
        index_meta: true
    });
}

const log = (type, str, meta) => {
    logger[type](str, meta);
    defaultLogger[type](str, meta);
};

export const info = (str, meta) => log("info", str, { meta });
export const error = (str, meta) => log("error", str, { meta });
export const debug = (str, meta) => log("debug", str, { meta });
export const warn = (str, meta) => log("warn", str, { meta });
