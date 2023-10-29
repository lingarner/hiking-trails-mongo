const express = require('express');
const app = express();
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const uri = process.env.uri;


// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJWT = auth({
    audience: 'https://hiking-trails.onrender.com',
    issuerBaseURL: 'https://dev-4ha050c0hqua8uiq.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

module.exports = {checkJWT}
