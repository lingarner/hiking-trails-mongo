// const router = require('./routes/index.js')
const express = require('express')
const app = express();
const {MongoClient} = require('mongodb');

app.use('/', require('./routes/index.js') )


const port = 5050;

app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || port));
});