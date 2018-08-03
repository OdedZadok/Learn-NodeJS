const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const testDB = 'TestNodeJS';
var db;
var clientObj;

openConnection = () => {
    MongoClient.connect(url, (err, client) => {
        assert.equal(null, err);
        db = client.db(testDB);
        clientObj = client;
        return db;
    });
};

closeConnection = () => {
    if (clientObj) {
        clientObj.close();
    }
};

module.exports = {
    openConnection,
    closeConnection
};

