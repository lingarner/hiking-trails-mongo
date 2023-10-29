// const router = require('./routes/index.js')
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

app.use(cors())
app.use(bodyParser.json())
app.use('/', require('./routes/index.js') )


// This route doesn't need authentication
app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

// This route needs authentication
app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

const checkScopes = requiredScopes('read:messages');

app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});




const port = 5050;

app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || port));
});