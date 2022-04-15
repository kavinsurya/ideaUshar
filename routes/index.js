const express = require('express');
const router = express.Router();

const searchRouter = require('./search');
router.use('/search', searchRouter);

module.exports = router;
