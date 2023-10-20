const { resolveSoa } = require("dns")
const { body, validationResult } = require("express-validator")
const validate = {}



validate.newHikeRules = () => {
    return [
      body("name")
        .isString()
        .isLength({ min: 1 })
        .withMessage("Error in name."),
  
      body("location")
        .isString()
        .isLength({ min: 1 })
        .withMessage("Error in location."),

      body("distance")
        .isString()
        .isLength({min: 1})
        .withMessage("Error in distance."),

  
      body("elevationGain")
        .isString()
        .isLength({min: 1})
        .withMessage("Error in elevation gain."),

      body("elevationLoss")
        .isString()
        .isLength({min: 1})
        .withMessage("Error in elevation loss."),

    body("lastHiked")
        .isString()
        .isLength({min: 1})
        .withMessage("Error in lasted hiked date."),

    body("comments")
        .isString()
        .isLength({min: 1})
        .withMessage("Error in comments."),
    ]
  }

/* ******************************
 * validation for POST route
 * ***************************** */
validate.checkDataInsert = async (req, res, next) => {
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(500).json({errors: errors.array() })
    } else if(errors.isEmpty()){
        return res.status(201)
    } 
    next()
  }


/* ******************************
 * validation for PUT route
 * ***************************** */
validate.checkDataInsert = async (req, res, next) => {
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(500).json({errors: errors.array() })
    } else if(errors.isEmpty()){
        return res.status(204)
    } 
    next()
  }





module.exports = validate