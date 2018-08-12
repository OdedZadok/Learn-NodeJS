const fs = require('fs');
var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: [{
        host: '2f4edbf514e74295b421e833a51cc2ee.eu-central-1.aws.cloud.es.io',
        auth: 'elastic:yU29KloQE6gMvc8epZkRsPnT',
        protocol: 'https',
        port: 9243
    }]
});


client.ping({
    requestTimeout: 30000,
}, function (error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
        uploadAllFiles();
    }
});

class Table {
    constructor(host, dbName, objectType, objectName, objectSource) {
        this.id = host + '~~' + dbName + '~~' + objectType + '~~' + objectName;
        this.host = host;
        this.database = dbName;
        this.object_name = objectName;
        this.object_type = objectType;
        this.object_source = objectSource;
    }
}

// client.delete({
//     index: 'bi-metadata',
//     type: 'ms-sql-table',
//     id: '1'
//   })
//   .catch(err => console.error(err))
//   .then(res => console.log(res)); 

// return;

// const engineName = 'bi-metadata';
const filesDir = "C:\\Learn\\Node\\Learn-NodeJS\\TempDbMetadata\\";

function getFileContent(filename) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filesDir + filename, 'utf-16le', function (err, data) {
            if (err)
                throw err;
            console.log('Read file: ' + filename);
            resolve(data);
        });
    });
}

function uploadObjectToCloud(objFileName) {
    getFileContent(objFileName)
        .then(data => {
            let testTable = new Table('WILOZ250011-736_SQL2017', 'Retail', 'Table', objFileName, data);

            client.create({
                    index: 'bi_metadata',
                    type: 'ms_sql_table',
                    id: testTable.id,
                    body: testTable
                })
                .catch(err => {
                    console.error(err);
                })
                .then(res => console.log("upload " + objFileName));
        });
}

function uploadAllFiles() {
    fs.readdir(filesDir, function (err, files) {
        //handling error    
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            uploadObjectToCloud(file);
        });
    });
}