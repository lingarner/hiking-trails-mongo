const model = require('../model/index')
const baseController = {}

baseController.getTrails =  async function(req, res) {
  try{
    // gets all the trails and info from db
    const listTrails = await model.getAllTrails();
    if(listTrails){
      res.status(200).send(listTrails)
    }else{
      throw new Error("Trails Not Found")
    }
  } catch (error) {
      res.status(500)
  }
}

baseController.getOneTrail = async function(req, res){
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

baseController.addTrail = async function(req, res){
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
baseController.deleteTrail = async function(req, res){
  try{
    const trailID = req.params._id;
    // deletes specific trail by ID
    const deleteResult = await model.removeTrail(trailID);
    if(deleteResult){
      res.send(deleteResult)
    } else{
      throw new Error('Some error occurred while deleting trail.')
    }
  } catch (error){
    res.status(500).json(error.message || 'Some error occurred while deleting trail.')
  }
}

baseController.updateTrail = async function(req, res){
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


module.exports = baseController;