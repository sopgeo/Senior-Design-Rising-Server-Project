import React from "react";
import "../css/GroupTables.css";

function GroupTables () {

    function createDummyData(numGroups, year){
  
        const returnData = [];
    
        const semesterArr = ["Summer", "Fall", "Spring"]; 

        for(let i = 0; i < 3; i++){

            for(let j = 0; j < numGroups; j++){

                for(let k = 0; k < 5; k++){

                    let firstName = "Bobby"
                    let lastName = "Johnson"
                    let semester = semesterArr[i] + " " + year; 
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