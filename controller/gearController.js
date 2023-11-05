const model = require('../model/gear.js')
const gearController = {}

gearController.getAllGear =  async function(req, res) {
  try{
    // gets all the trails and info from db
    const gearList = await model.getAllGear();
    if(gearList){
      res.status(200).send(gearList)
    }else{
      throw new Error("Gear Not Found")
    }
  } catch (error) {
      res.status(500)
  }
}

gearController.getOneGear = async function(req, res){
  try{
    let gearID = req.params._id;
    // retrives all info for specified id 
    const one = await model.getOneGear(gearID);
    if(one){
      return res.status(201).json({message: "Successfully retrieved one piece of gear", data: one});
    } else{
      throw new Error("Could not get a piece of gear with that ID")
    }
  } catch (error){
    res.status(500).json(error.message || 'Some error occurred while retrieving that piece of gear.');
  }
}

gearController.addGear = async function(req, res){
    /*    
        #swagger.parameters['gear'] = {
        in: 'body',
        description: 'Insert a new piece if gear',
        required: true,
        type: 'string',
        format: 'json',
        schema: {
            $name: 'Gear Name',
            $category: 'Gear Type (camping, backpacking, day hiking)',
            $description: 'Description',
            $price: 'Price',
            $condition: 'Condition of Item (new, used, worn, etc)',
            $weight: 'Weight (oz),
            $relatedTrails: 'List of trails used on'
          }
        }
      } */
    
    // allows user to insert new gear using res.body
    try {
      let newGear = await model.insertGear(req);
      if (newGear) {
        res.status(201).send(newGear.insertedId);
      } else {
        throw new Error('Some error occurred while creating the gear data.');
      }
    } catch (error) {
      res.status(500).json(error.message || 'Some error occurred while creating the gear data.');
    }
    
}


gearController.deleteGear = async function(req, res){
  try{
    const gearID = req.params._id;
    // deletes specific trail by ID
    const deleteResult = await model.removeGear(gearID);
    if(deleteResult){
      res.status(200).send(deleteResult)
    } else{
      throw new Error('Some error occurred while deleting piece of gear.')
    }
  } catch (error){
    res.status(500).json(error.message || 'Some error occurred while deleting piece of gear.')
  }
}

gearController.updateGear = async function(req, res){
    /* #swagger.parameters['_id'] = {
        in: 'path',
        description: 'Select and update a specific piece of gear',
        required: true,
        type: 'string',
        format: 'hex'
    }
    #swagger.parameters['gear'] = {
        in: 'body',
        description: 'Updated gear data',
        required: true,
        type: 'json',
        schema: {
            $name: 'Gear Name',
            $category: 'Gear Type (camping, backpacking, day hiking)',
            $description: 'Description',
            $price: 'Price',
            $condition: 'Condition of Item (new, used, worn, etc)',
            $weight: 'Weight (oz),
            $relatedTrails: 'List of trails used on'
          }
    }*/    
   
    // allows user to insert new trail using res.body
    try{
      let gearID = req.params._id;
      let updatedGear = await model.updateGear(gearID, req)
      if (updatedGear) {
          res.status(204).send(updatedGear.insertedId);
        } else {
          res.status(500).json(res.error || 'Some error occurred while updating the trail.');
        }
    } catch (error){
      res.status(500).json(error.message || 'Some error occurred while updating trail.')
    }
}

module.exports = gearController;