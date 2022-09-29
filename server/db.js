const { MongoClient } = require("mongodb");
let db;
require("dotenv").config();
const {dbName, MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

try{
    const client = new MongoClient(MONGO_URI, options);
    client.connect()
    db = client.db(dbName);
} catch(err){
    console.log(err.stack);
}

module.exports = {
    db
}