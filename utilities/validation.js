const { error } = require("console")
const {param, body, validationResult } = require("express-validator")
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

// check if the id in params is
  validate.checkID = () => {
    return [
        param('_id')
            .isString()
            .isLength({min: 12})
            .withMessage("Error with ID")
    ];
  };
  

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
validate.checkData = async (req, res, next) => {
    console.log('in check update')
    let errors = []
    errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array() })
    } 
    next()
  }





module.exports = validate