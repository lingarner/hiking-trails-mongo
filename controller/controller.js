const model = require('../model/index')
const baseController = {}

baseController.getTrails =  async function(req, res) {
    const listTrails = await model.getAllTrails();
    res.send(listTrails)
}

baseController.addTrail = async function(req, res){
    
    let newTrail = await model.insertTrail(req);
    if (newTrail) {
        res.status(201).send(newTrail.insertedId);
      } else {
        res.status(500).json(res.error || 'Some error occurred while creating the trail.');
      }
}


module.exports = baseController;