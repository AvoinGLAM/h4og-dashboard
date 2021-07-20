import config from '../../../config/config.json';
import * as logdnaLogger from './logdna.js';
import * as defaultLogger from './default.js';

let logger;

if (config.logdnaKey) {
    logdnaLogger.createLogger();
    logger = logdnaLogger;
} else {
    logger = defaultLogger;
}

export default logger;

