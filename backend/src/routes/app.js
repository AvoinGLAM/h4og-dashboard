import express from 'express';
const router = express.Router();

router.use('/', express.static('../frontend/build/'));

export default router;