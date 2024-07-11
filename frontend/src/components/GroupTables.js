import React from "react";
import "../css/GroupTables.css";

function GroupTables ({semester, groups}) {

    function createDummyData(numGroups, year){
  
        const groups = [];  
        const semesterArr = ["Summer", "Fall", "Spring"];
        
        let groupCount = 0;

        for(let i = 0; i < 3; i++){

            for(let j = 0; j < numGroups; j++){

                groupCount++;
                let members = [];

                for(let k = 0; k < 5; k++){

                    let name = "Bobby Johnson"; 
                    members.push(name);
                }

                //let groupNumAsString = groupCount.toString
                let groupName = "Group" + " " + groupCount.toString();
                let semester = semesterArr[i] + " " + year;
                groups.push({groupName, members, semester});
            }
        }

        return groups;
    }

    const dummyData = createDummyData(1, "2024");
    const testGroup = dummyData[0];

    return(
        <div>
            {console.log(createDummyData(2, "2024"))}

            <div className="semester-list">

                <div className="semester-title">
                    <h2>{testGroup.semester}</h2>
                </div>
                {dummyData.map((group, index) => (
                    <div className="group">
                        <div className="group-name">
                        <h3>{group.groupName}</h3>
                        </div>
                        <ul className="group-member-list">
                            {group.members.map((member, idx) => (
                                <li key={idx}>{member}</li>
                            ))}
                        </ul>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default GroupTables;