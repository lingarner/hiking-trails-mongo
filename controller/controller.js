const model = require('../model/index')
const baseController = {}

baseController.hi =  async function(req, res) {
    const listTrails = await model.getAllTrails();
    res.send(listTrails)
}


module.exports = baseController;