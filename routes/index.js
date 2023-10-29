const express = require('express');
const router = new express.Router();
const swagger = require('./swagger.js')
const utilities = require('../utilities/validation.js')
const auth = require('../utilities/auth0.js')
const controller = require('../controller/controller.js');

// route for the swagger ui
router.use("/", swagger)

// route to get all trails
router.get('/', controller.getTrails)

// route to test auth0
router.get('/private', 
auth.chckJWT, 
controller.testPrivate
)

// route to get one trail by id
router.get('/:_id',
utilities.checkID(),
utilities.checkData,
controller.getOneTrail)

// route to add a new trail to the db
router.post('/', 
utilities.newHikeRules(),
utilities.checkDataInsert,
controller.addTrail);

// route to delete a trail by an id
router.delete('/:_id',
utilities.checkID(),
utilities.checkData,
controller.deleteTrail)

// route to update db
router.put('/:_id', 
// checks PUT data and ID
utilities.newHikeRules(),
utilities.checkID(),
utilities.checkData,
controller.updateTrail)

module.exports = router