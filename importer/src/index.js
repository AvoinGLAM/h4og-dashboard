import { importData } from './import/import.js';
import logger from './logger/logger.js';

logger.debug(new Date().toUTCString());
logger.info(`\nHack4OpenGLAM Dashboard importer v${process.env.npm_package_version} ${process.env.NODE_ENV}
${process.argv.includes('--dry-run') ? `This is a dry run` : ''}`)

importData();
setInterval(importData, 5 * 60 * 1000);
