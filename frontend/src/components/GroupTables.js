import React from "react";
import "../css/GroupTables.css";

function GroupTables () {

    function createDummyData(numGroups, year){
  
        const returnData = [];
    
        const semesterArr = ["Summer", "Fall", "Spring"]; //see if this is right
    
        for(let i =0; i < numGroups; i++){
    
            for (let j = 0; j < 3; j++){ //for each semester
    
                for(let k = 0; k < 5; k++){//each member in group
                
                    let firstName = "Bobby"
                    let lastName = "Johnson"
                    let semester = semesterArr[j] + " " + year; //check if right
                    returnData.push({firstName, lastName, semester});
                }
            }
        }
        return returnData;
    }

    return(
        <>
            {console.log(createDummyData(2, "2024"))}
        </>
    );
}

export default GroupTables;