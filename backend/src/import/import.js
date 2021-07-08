import { GoogleSpreadsheet } from 'google-spreadsheet';
import fs from 'fs/promises';
import path from 'path';

import config from '../../../config/config.json';
import googleKey from '../../../config/google-key.json';
import { parseTable } from './parser/parser.js';
import { createChannel } from './mattermost.js';
import { mailTemplates, sendMail } from './mail.js';
import { addSlugs } from './slugs.js';

import logger from '../logger/logger.js';

const isDryRun = process.argv.includes('--dry-run') ? 'DRY ' : '';

const dataFilePath = path.join(path.resolve(), 'data.json');

/**
 * Run tasks for new added items
 * State of being new is based on followUpFlag-column (BA) in the spreadsheet
 * @param {Object} item 
 * @param {GoogleSpreadsheetWorksheet} sheet 
 */
const firstTimeTasks = async (item, sheet) => {
    if (item?.meta.followUpFlag != "1" && item?.meta.followUpFlag != "2") {
        // Flag has not been set off yet, thus this is a new item
        const followUpFlagCell = sheet.getCellByA1(`BA${item.index + 2}`);

        if (item.type == "projects") {
            const ownerDetails = item.meta.owner;

            await createChannel(item.name, item.slug);
            await sendMail({
                to: ownerDetails.email,
                subject: "Hack4OpenGLAM Dashboard",
                text: mailTemplates.newUserAndChannel(ownerDetails.name, item.slug)
            });

            followUpFlagCell.value = "1";
        } else if (item.type == "people" && !item.meta.rowIncludesProjectProposal) {
            await sendMail({
                to: item.email,
                subject: "Hack4OpenGLAM Dashboard",
                text: mailTemplates.newUser(item.name)
            });

            followUpFlagCell.value = "2";
        }
    }
};

/**
 * Imports data from spreadsheet, parses it, runs related automated tasks, and saves the imported data on the disk
 */
export const importData = async () => {
    logger.info(`Importing data... ${new Date().toUTCString()}`);

    // Load up the Google Spreadsheet document
    const doc = new GoogleSpreadsheet(config.spreadsheetId);
    await doc.useServiceAccountAuth(googleKey);
    await doc.loadInfo(); 
    const sheet = doc.sheetsByIndex[0];
    sheet.headerValues = []; // empty headerValues array prevents google-spreadsheet from calling loadHeaderRow()
    const rows = await sheet.getRows();
    logger.info(`Loaded document ${doc.title}`)

    // Parse the Spreadsheet data into an array of objects
    let out = await Promise.all(parseTable(rows));
    out = addSlugs(out);

    await sheet.loadCells(`BA1:BA${rows.length + 2}`); // Load followUpFlag column
    
    logger.info(`Parsed in total ${out.length} items:`);

    // Loop through all data objects to:
    // - clean up them
    // - do automated tasks
    out = await Promise.all(out.map(async (item) => {
        logger.info(`    ${item.type.padEnd(14, " ")}: ${item.name.padEnd(32, " ")} (${item.slug})`)

        // Run automated tasks for new items
        await firstTimeTasks(item, sheet);

        // Clean up object
        // Delete email key, if user declined from showing it publicly
        if (!item.meta?.emailAllowed) delete item.email; 
        if (item.meta) delete item.meta;

        return item;
    }))

    logger.info(`${isDryRun}Saving updated cells`);
    if (!isDryRun) await sheet.saveUpdatedCells();
    
    await fs.writeFile(dataFilePath, JSON.stringify(out, null, 2));
    logger.info(`Saved data.json`);
};
