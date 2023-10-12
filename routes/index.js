const express = require('express');
const router = new express.Router();
const controller = require('../controller/controller.js');

router.get('/', controller.getTrails)
router.post('/', controller.addTrail);

module.exports = router