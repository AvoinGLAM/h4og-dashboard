import logger from '../logger/logger.js';
import express from 'express';
import cors from 'cors';

const router = express.Router();

import data from '../../../data/data.json';

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

export default router;