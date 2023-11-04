const express = require('express');
const router = new express.Router();
// const trails = 


// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/trails', require('./trails'))




module.exports = router;
