import config from '../../../config/config.json';
import axios from 'axios';
import logger from '../logger/logger.js';

const isDryRun = process.argv.includes('--dry-run') ? 'DRY ' : '';

export const createChannel = (name, slug) => {
    logger.info(`${isDryRun}Creating channel ${name} [${slug}]`);
    if (isDryRun) return;

    return axios.post("https://community.okf.fi/api/v4/channels",
    { 
        "team_id": config.mattermost.teamId, 
        "name": `project-${slug}`, 
        "display_name": name, 
        "type": "O" 
    },
    {
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${config.mattermost.token}`
        }
    }).catch(reason => {
        logger.error(`Couldn't create a channel for ${name} (${slug}), because "${JSON.stringify(reason.response.data)}"`, {response: reason.response.data});
    })
};

//createChannel('Project Test 3', 'test-3');
