import { GoogleSpreadsheet } from 'google-spreadsheet';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

import config from '../../../config/importer/config.json';
import googleKey from '../../../config/importer/google-key.json';
import { parseTable } from './parser/parser.js';
import { createChannel } from './mattermost.js';
import { addNewSubscriber } from './mailerlite.js';
import { mailTemplates, sendMail } from './mail.js';
import { addSlugs } from './slugs.js';

import logger from '../logger/logger.js';

const isDryRun = process.argv.includes('--dry-run') ? 'DRY ' : '';

const dataFilePath = path.join(path.resolve(), '../data/data.json');

/**
 * Run tasks for new added items
 * State of being new is based on followUpFlag-column (BD) in the spreadsheet
 * @param {Object} item 
 * @param {Object} context 
 */
const firstTimeTasks = async (item, ctx) => {
    if (item?.meta.followUpFlag != "1" && item?.meta.followUpFlag != "2") {
        // Flag has not been set off yet, thus this is a new item
        const followUpFlagCell = ctx.sheet.getCellByA1(`BD${item.index + 2}`);

        if (item.type == "projects") {
            // Case: New project and person
            const ownerDetails = item.meta.owner;

            // Create a channel
            await createChannel(item.name, item.slug)
                // Send a welcome email
                .then(() => sendMail({
                    to: ownerDetails.email,
                    subject: "Hack4OpenGLAM Dashboard",
                    text: mailTemplates.newUserAndChannel(ownerDetails.name, item.slug),
                    internal: "newUserAndChannel"
                }))
                .then(() => addNewSubscriber(ctx.owner))
                // Update the flag cell
                .then(() => { followUpFlagCell.value = "1"; })
                .catch((reason) => { logger.error(reason) });
            
        } else if (item.type == "people" && !item.meta.rowIncludesProjectProposal) {
            // Case: new person, nothing else
            // Send a welcome email
            await sendMail({
                    to: item.email,
                    subject: "Hack4OpenGLAM Dashboard",
                    text: mailTemplates.newUser(item.name),
                    internal: "newUser"
                })
                .then(() => addNewSubscriber(item))
                // Update the flag cell
                .then(() => { followUpFlagCell.value = "2"; })
                .catch((reason) => { logger.error(reason) });
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

    await sheet.loadCells(`BD1:BD${rows.length + 2}`); // Load followUpFlag column
    
    const getOwnerByEmail = (email) => out.find(o => o.type == "people" && o.email == email);

    logger.info(`Parsed in total ${out.length} items:`);

    // Loop through all data objects to automated tasks
    out = await Promise.all(out.map(async (item) => {
        logger.info(`    ${item.type.padEnd(14, " ")}: ${item.name.padEnd(32, " ")} (${item.slug})`)

        // Run automated tasks for new items
        await firstTimeTasks(item, {
            sheet: sheet,
            owner: (item.type != "people" ? getOwnerByEmail(item?.meta?.owner?.email) : item.email)
        });
        return item;
    }))

    out = out.map(item => {
        // Clean up object

        item.ownerHash = md5(item.email || item.meta?.owner?.email);

        // Delete email key, if user declined from showing it publicly
        if (!item.meta?.emailAllowed) delete item.email; 
        if (item.meta) delete item.meta;

        return item;
    });

    logger.info(`${isDryRun}Saving updated cells`);
    if (!isDryRun) await sheet.saveUpdatedCells();
    
    await fs.writeFile(dataFilePath, JSON.stringify(out, null, 2));
    logger.info(`Saved data.json`);
};

const md5 = (str) => crypto.createHash('md5').update(config.hashSalt + str).digest('hex');