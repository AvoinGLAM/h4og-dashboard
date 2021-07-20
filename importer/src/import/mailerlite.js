import config from '../../../config/importer/config.json';
import axios from 'axios';
import logger from '../logger/logger.js';

const isDryRun = process.argv.includes('--dry-run') ? 'DRY ' : '';

export const addNewSubscriber = (person) => {
    logger.info(`${isDryRun}Subscribing a person to the newsletter ${person.email} [${person.name} ${person.meta.lastName}]`);
    if (isDryRun) return;
    if (!person) throw 'No person provided';
    return axios.post(`https://api.mailerlite.com/api/v2/groups/${config.mailerlite.groups.newParticipant}/subscribers`,
    { 
        "email": person.email,
        "name": person.name,
        "fields": {
            "last_name": person.meta.lastName,
            "company": person.company
        },
        "type": "active"
    },
    {
        headers: {
            "content-type": "application/json",
            "X-MailerLite-ApiKey": config.mailerlite.apiKey
        }
    })
    .catch(reason => {
        throw reason.response.data;
    })
};
