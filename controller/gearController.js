const model = require('../model/gear.js')
const gearController = {}

gearController.getAllGear =  async function(req, res) {
  try{
    // gets all the trails and info from db
    const gearList = await model.getAllGear();
    console.log("controller " + gearList)
    if(gearList){
      res.status(200).send(gearList)
    }else{
      throw new Error("Gear Not Found")
    }
  } catch (error) {
      res.status(500)
  }
}

gearController.getOneTrail = async function(req, res){
  try{
    let trailID = req.params._id;
    // retrives all info for specified id 
    const one = await model.getOneTrail(trailID);
    if(one){
      return res.status(201).json({message: "Successfully retrieved one trail", data: one});
    } else{
      throw new Error("Could not get Trail with that ID")
    }
  } catch (error){
    res.status(500).json(error.message || 'Some error occurred while retrieving the trail.');
  }
}

gearController.addTrail = async function(req, res){
    /*    
        #swagger.parameters['trail'] = {
        in: 'body',
        description: 'Insert a new Trail',
        required: true,
        type: 'string',
        format: 'json',
        schema: {
            $name: 'New Trail Name',
            $location: 'Location',
            $distance: 'Distance',
            $elevationGain: 'Net Elevation Gain',
            $elevationLoss: 'Net Elevation Loss',
            $lastHiked: 'Date Last Hiked',
            $comments: 'Comments about the hike.'
          }
        }
      } */
    
    // allows user to insert new trail using res.body
    try {
      let newTrail = await model.insertTrail(req);
      if (newTrail) {
        res.status(201).send(newTrail.insertedId);
      } else {
        throw new Error('Some error occurred while creating the trail.');
      }
    } catch (error) {
      res.status(500).json(error.message || 'Some error occurred while creating the trail.');
    }
    
}

// broken
gearController.deleteTrail = async function(req, res){
  try{
    const trailID = req.params._id;
    // deletes specific trail by ID
    const deleteResult = await model.removeTrail(trailID);
    if(deleteResult){
      res.status(200).send(deleteResult)
    } else{
      throw new Error('Some error occurred while deleting trail.')
    }
  } catch (error){
    res.status(500).json(error.message || 'Some error occurred while deleting trail.')
  }
}

gearController.updateTrail = async function(req, res){
    /* #swagger.parameters['_id'] = {
        in: 'path',
        description: 'Select and update a specific contact',
        required: true,
        type: 'string',
        format: 'hex'
    }
    #swagger.parameters['trail'] = {
        in: 'body',
        description: 'Updated trail data',
        required: true,
        type: 'json',
        schema: {
            $name: 'New Trail Name',
            $location: 'Location',
            $distance: 'Distance',
            $elevationGain: 'Net Elevation Gain',
            $elevationLoss: 'Net Elevation Loss',
            $lastHiked: 'Date Last Hiked',
            $comments: 'Comments about the hike.'
        }
    }*/    
   
    // allows user to insert new trail using res.body
    try{
      let trailID = req.params._id;
      let updatedTrail = await model.updateTrail(trailID, req)
      if (updatedTrail) {
          res.status(204).send(updatedTrail.insertedId);
        } else {
          res.status(500).json(res.error || 'Some error occurred while updating the trail.');
        }
    } catch (error){
      res.status(500).json(error.message || 'Some error occurred while updating trail.')
    }
}
gearController.testPrivate = function(req, res) {
  res.send('Private');
}


module.exports = gearController;