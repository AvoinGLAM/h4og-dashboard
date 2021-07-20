import config from '../../../config/importer/config.json';
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

