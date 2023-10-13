const model = require('../model/index')
const baseController = {}

baseController.getTrails =  async function(req, res) {
    // gets all the trails and info from db
    const listTrails = await model.getAllTrails();
    res.send(listTrails)
}

baseController.getOneTrail = async function(req, res){
    let trailID = req.params._id;
    // retrives all info for specified id 
    const one = await model.getOneTrail(trailID);
    res.send(one)
}

baseController.addTrail = async function(req, res){
    /*    
        #swagger.parameters['contact'] = {
        in: 'body',
        description: 'Insert a new Contact',
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
    let newTrail = await model.insertTrail(req);
    if (newTrail) {
        res.status(201).send(newTrail.insertedId);
      } else {
        res.status(500).json(res.error || 'Some error occurred while creating the trail.');
      }
}

baseController.deleteTrail = async function(res, req){
    const trailID = req.params._id;
    // deletes specific trail by ID
    const deleteResult = await model.removeTrail(trailID);
    res.send(deleteResult)
}


module.exports = baseController;