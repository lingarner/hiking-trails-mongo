const {MongoClient,  ObjectId} = require('mongodb');
require('dotenv').config();
const uri = process.env.uri;

// returns all trails in database
async function getAllGear() {

const client = new MongoClient(uri);


try {
    await client.connect();

    const database = client.db('hiking');
    const collection = database.collection('gear');

    const cursor = collection.find();

    const data = [];
    await cursor.forEach(document => {
        data.push(document);
    });
    console.log(data)
    
    return data

} catch (error) {
    console.error('Error:', error);
} finally {
    client.close();
}
}

// returns the trail associated with the id passed in
async function getOneGear(id){
    const client = new MongoClient(uri);
    console.log(id)
    
    try {
    await client.connect();
    
    const database = client.db('hiking');
    const collection = database.collection('gear');
    const query = { _id: new ObjectId(id) };
    const contact = await collection.findOne(query);
    
    return contact
    
    } catch (error) {
    console.error('Error:', error);
    } finally{
    await client.close()
    }
}

// allows user to add a new trail
async function insertGear(req) {
    console.log('in insertGear');
    console.log(req);

    const client = new MongoClient(uri);


try {
    await client.connect();

    const database = client.db('hiking');
    const collection = database.collection('gear');

    
    const dataInput = {
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    condition: req.body.condition,
    weight: req.body.weight,
    relatedTrails: req.body.relatedTrails
    };
    
    const cursor = await collection.insertOne(await dataInput);
    console.log(cursor)
    
    return cursor

} catch (error) {
    console.error('Error:', error);
} finally{
    await client.close()
}
}

async function removeGear(id){
console.log(id)
const client = new MongoClient(uri);

try {
    await client.connect();
    
    const database = client.db('hiking');
    const collection = database.collection('gear');

    const filter = { _id: new ObjectId(id) };

    const contact = await collection.deleteOne(filter);
    
    return contact

    
} catch (error) {
    console.error('Error:', error);
} finally{
    await client.close()
}

}

async function updateGear(id, req){
const client = new MongoClient(uri);

try {
    await client.connect();
    
    const database = client.db('hiking');
    const collection = database.collection('gear');

    const filter = { _id: new ObjectId(id) };
    const update = {
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        condition: req.body.condition,
        weight: req.body.weight,
        relatedTrails: req.body.relatedTrails
    
    }
    const contact = await collection.replaceOne(filter, update);
    return contact.modifiedCount
    
} catch (error) {
    console.error('Error:', error);
} finally{
    await client.close()
}
}
module.exports = {getAllGear, getOneGear, insertGear, removeGear, updateGear}