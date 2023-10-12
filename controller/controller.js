const model = require('../model/index')
const baseController = {}

baseController.hi =  async function(req, res) {
    const listDatabases = await model.main();
    res.send(listDatabases)
}


module.exports = baseController;