const express = require('express');
const router = new express.Router();
const utilities = require('../utilities/validation.js')
const controller = require('../controller/controller.js');


// go to hiking routes
// route to get all trails
router.get('/', controller.getTrails)

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


module.exports = router;