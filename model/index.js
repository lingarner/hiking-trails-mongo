const {MongoClient} = require('mongodb');
require('dotenv').config();


async function main() {
    const uri = process.env.uri;
    const client = new MongoClient(uri);
	 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
       const data =  await listDatabases(client);
    
       return data

 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

module.exports = {main}