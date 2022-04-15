const express = require('express');
const router = express.Router();
const { searchKeyword, addJsonData } = require('../controller/search');

router.post('/searchKeyword', searchKeyword);

module.exports = router;
