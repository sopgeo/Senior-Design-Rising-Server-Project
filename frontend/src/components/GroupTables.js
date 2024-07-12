import React from "react";
import { useState, useEffect } from "react";
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

                let groupName = "Group" + " " + groupCount.toString();
                let semester = semesterArr[i] + " " + year;
                groups.push({groupName, members, semester});
            }
        }

        return groups;
    }

    const dummyData = createDummyData(1, "2024");
    const testGroup = dummyData[0];


    const [isSemesterExpanded, setIsSemesterExpanded] = useState(true);
    const [expandedGroups, setExpandedGroups] = useState({});
    const [groupData, setGroupData] = useState(dummyData);

    const toggleSemester = () => {
        setIsSemesterExpanded(!isSemesterExpanded);
    };

    const toggleGroup = (index) => {
        setExpandedGroups(prevState => ({
            ...prevState, 
            [index]:!prevState[index]
        }));
    };

    const deleteMember = (groupIndex, memberIndex) => {
        setGroupData(prevGroupData => {
            const newGroupData = [...prevGroupData];
            newGroupData[groupIndex].members.splice(memberIndex, 1);
            return newGroupData;
        });
    }; 

    return(
        <div>

            <div className="semester-list">

                <div className="semester-title" >
                    <h2>{testGroup.semester}</h2>
                    <button 
                    className={`dropdown-button ${isSemesterExpanded ? 'rotated' : ''}`} 
                    onClick={toggleSemester}>
                        ▶
                    </button>
                </div>
                {isSemesterExpanded && dummyData.map((group, index) => (
                    <div className="group" key={index}>
                        <div className="group-name">
                        <h3>{group.groupName}</h3>
                        <button 
                        className={`dropdown-button group-button ${expandedGroups[index] ? `rotated` : ``} `}
                        onClick={() => toggleGroup(index)}> 
                            ▶
                        </button>
                    </div>
                        {expandedGroups[index] && (
                        <ul className="group-member-list">
                            {group.members.map((member, idx) => (
                                <li key={idx}>{member}
                                    <button className="edit-button">
                                        <img className="edit-icon" src={require('../images/edit-button.png')} width="22px" height="22px"/></button>
                                    <button className="delete-member-button" onClick={() => deleteMember(index, idx)}>
                                        <img className="delete-button" src={require('../images/delete-button.png')} width="22px" height="22px"/>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        )}
                    </div>
                ))}

            </div>

        </div>
    );
}

export default GroupTables;