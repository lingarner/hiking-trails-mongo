const {MongoClient} = require('mongodb');
require('dotenv').config();
const uri = process.env.uri;

async function getAllTrails() {

  const client = new MongoClient(uri);

  
  try {
    await client.connect();

    const database = client.db('hiking');
    const collection = database.collection('trails');

    const cursor = collection.find();

    const data = [];
    await cursor.forEach(document => {
        data.push(document);
    });
    console.log(data)
    
    return data

  } catch (error) {
    console.error('Error:', error);
  }
}


module.exports = {getAllTrails}