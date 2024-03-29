const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'hiking-trails.onrender.com/hiking',
  schemes: ['https'],
};

const outputFile = 'swagger-output.json';
const endpointsFiles = ['./routes/hiking.js'];

/* NOTE: if you use the express Router, you must pass in the 
  'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);