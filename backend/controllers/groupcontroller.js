const db = require('../models');
const Group = db.groups
const User = db.users

//will need to install csv-parse node module
const fs = require('fs'); //look into using ES modules
const csvParser = require('csv-parser');

//Returns a promise and if the promise is resolved, then it returns the data within the csv
//The data is returned as an array of objects, with each object containing the information for one row 
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
async function parseGroupInfo( path ){

    const groups = {};

    try { 

        const data = await parseCSV( path ); //awaiting promise

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

        return groups; 

    } catch (error) {

        console.error('Error parsing group CSV', error);
    }

}

exports.getGroups = async (req, res) => {
    try {
        let groups
        if (groups && groups !== '') groups = await Group.findAll({
            order: [["title"]],
            where: {
                semester: req.body.semester
            },
            include: [
                {
                    model: User,
                    
                }
            ]
                
            
        })
        else groups = await Group.findAll()
        
        res.status(200).json(groups);
    } catch (error) {
      console.log(error);
      res.status(500).json({error: error.message, message: "Error occurred getting groups"});
    }
}
