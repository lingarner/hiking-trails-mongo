// const router = require('./routes/index.js')
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { auth } = require('express-openid-connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');


require('dotenv').config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.secret,
  baseURL: 'https://hiking-trails.onrender.com',
  clientID: 'GVYqWNWpErgH8aiyGUtV8FF5jGxezcLR',
  issuerBaseURL: 'https://dev-4ha050c0hqua8uiq.us.auth0.com'
};

const checkAuth = (req, res, next) => {
  if (!req.oidc.isAuthenticated()) {
    return res.status(401).send('Unauthorized. Please log in');
  }
  next()
  // res.send(JSON.stringify(req.oidc.user));
}

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.use(cors())
app.use(bodyParser.json())
app.use('/', require('./routes/index.js') )
app.use('/trails', require('./routes/trails.js') )
app.use('/api-docs', checkAuth, swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || port));
});