const express = require('express');
const router = new express.Router();
const controller = require('../controller/controller.js');

router.get('/', controller.hi)

module.exports = router