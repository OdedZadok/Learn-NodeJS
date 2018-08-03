const Fs = require('fs');
const SwiftypeAppSearchClient = require('swiftype-app-search-node');
const client = new SwiftypeAppSearchClient('host-8j8u9o', 'private-2tt5rtira53u3qkb1v9bfn2w');
const engineName = 'bi-metadata';
const filesDir = "C:\\Learn\\Node\\Learn-NodeJS\\TempDbMetadata\\";

function getFileContent(filename) {
    return new Promise(function (resolve, reject) {
        Fs.readFile(filesDir + filename, 'utf-16le', function (err, data) {
            if (err)
                throw err;
            console.log('Read file: ' + filename);
            resolve(data);
        });
    });
}

function createDocumentObject(host, dbName, objectType, objectName, objectSource) {
    return {
        id: host + '~~' + dbName + '~~' + objectType + '~~' + objectName,
        host: host,
        database: dbName,
        object_name: objectName,
        object_type: objectType,
        object_source: objectSource,
    };
}

var objFileName = 'dbo.Accommodations.Table.sql';


getFileContent(objFileName)
    .then(data => {
        let docObj = createDocumentObject('WILOZ250011-736_SQL2017', 'Retail', 'Table', objFileName, data);
        client.indexDocuments(engineName, docObj)
            .then((docs) => {
                if (docs && docs.length > 0) {
                    if (docs[0].errors.length > 0) {
                        throw 'Error Upload ' + objFileName + ' error:' + docs[0].errors;   
                    }
                    console.log('Upload ' + objFileName);  
                }

                throw 'Error Upload ' + objFileName;
            })
            .catch((error) => {
                console.log('Error Upload ' + objFileName, error);
            });
        
    });