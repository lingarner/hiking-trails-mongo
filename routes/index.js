const express = require('express');
const router = new express.Router();
const swagger = require('./swagger.js')
const controller = require('../controller/controller.js');

router.use("/", swagger)

router.get('/', controller.getTrails)
router.get('/:_id', controller.getOneTrail)
router.post('/', controller.addTrail);

module.exports = router