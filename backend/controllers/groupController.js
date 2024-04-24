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

//Returns an object that has arrays of student names with keys that are the group names
function createGroups( path ){

    const groups = {};

    parseCSV(path)
        .then((data) => {

            data.forEach((row) => {
                const studentName = row['name'];
                const groupName = row['group_name'];
    
                //checking if group exists
                if (!groups[groupName]) {
                    groups[groupName] = [];
                }
    
                //add student name to group
                groups[groupName].push(studentName);
            });

        })
        .catch((error) => {
            console.error('Error parsing group creation CSV:', error);
        });
        
    return groups;
}