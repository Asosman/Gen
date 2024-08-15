const mongodbclient = require('mongodb').MongoClient;

let database;

async function connectToDatabase(){
    const client = await mongodbclient.connect('mongodb://localhost:27017');
    database = client.db('Gen');
}

function getDb(){
    if(!database){
        throw new Error('could not connect....');
    }else{
        return database;
    }
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb:getDb
}