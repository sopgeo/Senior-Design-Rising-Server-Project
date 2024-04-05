//will need to install csv-parse node module
const fs = require('fs'); //look into using ES modules
const csvParser = require('csv-parser');

function parseCSV( path ){
    const results = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(path)
            .pipe(csvParser())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

function createGroups( path ){

    parseCSV(path)
        .then((data) => {

        })
        .catch((error) => {
            console.error('Error parsing group creation CSV:', error);
        });
}