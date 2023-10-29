const express = require('express');
const app = express();
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const uri = process.env.uri;


// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
    audience: `${process.env.uri}`,
    issuerBaseURL: `https://localhost:5050/`,
  });

module.exports = {checkJwt}
