import logger from '../logger/logger.js';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs/promises';

const router = express.Router();

import commonConfig from '../../../config/common.json';

let data = [];

const loadData = async () => {
    data = JSON.parse(await fs.readFile(path.join(path.resolve(), '../data/data.json'), 'utf8'));
    console.log(`Data loaded. Array size ${data.length}.`)
};
loadData();

router.use(cors());

router.get('/results', (req, res) => {
    let results = data.filter(item => {
        if (req.query.type ? item.type != req.query.type : false) return;
        if (req.query.ownerHash ? item.ownerHash != req.query.ownerHash : false) return;
        if (req.query.slug ? item.slug != req.query.slug : false) return;
        
        return item;
    })

    logger.info(`Requested results for ${JSON.stringify(req.query)}, ${results.length} results`);

    res.json(results);
});

router.get('/update', (req, res) => {
    if (commonConfig.internalApiKey !== req.headers['authorization']) {
        console.log('Backend update request failed, invalid authorization.')
        res.status(401).end('unauthorized');
        return;
    }

    loadData();

    res.end('ok');
})

export default router;