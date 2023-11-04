const express = require('express');
const router = new express.Router();


// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// route to get trails
// router.get('/trails/', require('./trails'))




module.exports = router;
