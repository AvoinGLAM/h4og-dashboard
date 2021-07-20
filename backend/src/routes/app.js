import express from 'express';
import path from 'path';
const router = express.Router();

router.use('/', express.static('./web/'));
router.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), './web/index.html'));
});

export default router;