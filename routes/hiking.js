const express = require('express');
const router = new express.Router();
const utilities = require('../utilities/validation.js')
const controller = require('../controller/controller.js');
const gearController = require('../controller/gearController.js')

/***************
*
* ROUTES FOR GEAR COLLECTION
*
****************/ 
// get all gear
router.get('/gear', gearController.getAllGear)

// get one piece of gear
router.get('/gear/:_id', gearController.getOneGear)

// route to add a new trail to the db
router.post('/gear',gearController.addGear);

// route to delete a trail by an id
router.delete('/gear/:_id', gearController.deleteGear)

// route to update db
router.put('/gear/:_id', gearController.updateGear)



/***************
*
* ROUTES FOR TRAILS COLLECTION
*
****************/ 


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