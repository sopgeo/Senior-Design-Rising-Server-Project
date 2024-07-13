import React from "react";
import { useState, useEffect } from "react";
import "../css/GroupTables.css";

function GroupTables ({semester}) {

    function createDummyData(numGroups, year){
  
        const groups = [];  
        const semesterArr = ["Summer", "Fall", "Spring"];
        
        let groupCount = 0;

        for(let i = 0; i < 3; i++){

            for(let j = 0; j < numGroups; j++){

                groupCount++;
                let members = [];

                for(let k = 0; k < 5; k++){

                    let memberCount = (k+1).toString();
                    let name = "Bobby Johnson" + memberCount;
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
    const [editingMember, setEditingMember] = useState({groupIndex: null, memberIndex: null, editedName: "", originalName: ""});
    const [newGroupName, setNewGroupName] = useState("");
    const [isAddingNewGroup, setIsAddingNewGroup] = useState(false); //keeps track of if a new group is being added and saved
    

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

        const groupMemberName = groupData[groupIndex].members[memberIndex];
        const groupName = groupData[groupIndex].groupName;
        const confirmed = window.confirm(`Are you sure you want to delete ${groupMemberName} from ${groupName}?`);

        if( confirmed ) {
            setGroupData(prevGroupData => {
                const newGroupData = [...prevGroupData];
                newGroupData[groupIndex] = {
                    ...newGroupData[groupIndex], 
                    members: [...newGroupData[groupIndex].members]
                };
                newGroupData[groupIndex].members.splice(memberIndex, 1);
                return newGroupData;
            });
        }
    };
    
    const startEditingMember = (groupIndex, memberIndex, memberName) => {
        if(editingMember.groupIndex!== null || editingMember.memberIndex !== null){
            cancelEdit(editingMember.groupIndex, editingMember.memberIndex);
    }
        setEditingMember({ groupIndex, memberIndex, editedName: memberName, originalName: memberName });
    };

    const handleMemberNameChange = (e) => {
        setEditingMember((prev) => ({...prev, editedName: e.target.value}));
    };

    const saveMemberName = (groupIndex, memberIndex) => {
        setGroupData((prevGroupData) => {
            const newGroupData = [...prevGroupData];
            newGroupData[groupIndex] = {
                ...newGroupData[groupIndex], 
                members: [...newGroupData[groupIndex].members],
            };
            newGroupData[groupIndex].members[memberIndex] = editingMember.editedName;
            return newGroupData;
        });
        setEditingMember({groupIndex:null, memberIndex:null, editedName:"", originalName:""});
    };

    const cancelEdit = (groupIndex, memberIndex) => {
        setGroupData((prevGroupData) => {
            const newGroupData = [...prevGroupData];
            newGroupData[groupIndex] = {
                ...newGroupData[groupIndex], 
                members: [...newGroupData[groupIndex].members],
            };
            newGroupData[groupIndex].members[memberIndex] = editingMember.originalName;
            return newGroupData;
        });
        setEditingMember({groupIndex: null, memberIndex: null, editedName: editingMember.originalName, originalName: ""});
    };

    const addGroup = () => {

        if(!isAddingNewGroup){
            const newGroup = {
                groupName: `Group ${groupData.length + 1}`,
                members: [], 
                semester: dummyData[0].semester 
            };
            setGroupData([...groupData, newGroup]);
            setIsAddingNewGroup(true);
            setNewGroupName(newGroup.groupName);
            setExpandedGroups({...expandedGroups, [groupData.length]: true});

        }
        else{
            alert("Can not add two groups at a time");
        }
    };

    const saveNewGroupName = (index) => {
        if (newGroupName.trim() !== "") {
            setGroupData(prevGroupData => {
                const newGroupData = [...prevGroupData];
                newGroupData[index].groupName = newGroupName;
                return newGroupData;
            });
            setNewGroupName("");
            setIsAddingNewGroup(false);
        }
    };

    return(
            <div className="semester-list">

                <div className="semester-title" >
                    <h2>{groupData[0].semester}</h2>
                    <button className="add-group-button" onClick={addGroup}>+ Add Group</button>
                    <button 
                    className={`dropdown-button ${isSemesterExpanded ? 'rotated' : ''}`} 
                    onClick={toggleSemester}>
                        <img src={require('../images/black-dropdown-button.png')} width="38px" height="38px"/>
                    </button>
                </div>
                {isSemesterExpanded && groupData.map((group, index) => (
                    <div className="group" key={index}>
                        <div className="group-name">

                            {isAddingNewGroup && index === groupData.length -1 ? (
                                <input 
                                    type="text"
                                    value={newGroupName}
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                    onBlur={() => saveNewGroupName(index)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            saveNewGroupName(index);
                                        }
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <>

                            <h3>{group.groupName}</h3>
                            <button 
                            className={`dropdown-button group-button ${expandedGroups[index] ? `rotated` : ``} `}
                            onClick={() => toggleGroup(index)}> 
                                <img src={require('../images/white-dropdown-button.png')} width="22px" height="22px"/>
                            </button>
                            </>
                            )}
                        </div>
                        {expandedGroups[index] && (
                        <ul className="group-member-list">
                            {group.members.map((member, idx) => (
                                <li key={idx} className="member-row">
                                    {editingMember.groupIndex === index && editingMember.memberIndex == idx ? (
                                        <input
                                        type="text"
                                        value={editingMember.editedName}
                                        onChange={handleMemberNameChange}
                                        onBlur={() => cancelEdit(index, idx)}
                                        onKeyDown={(e) => {
                                            if(e.key === "Enter") {
                                                saveMemberName(index, idx);
                                            }
                                        }}
                                        autoFocus
                                    />
                                    ) : (
                                    <>
                                    {member} 
                                    <div className="member-button-container">
                                        <button className="edit-button" onClick={() => startEditingMember(index, idx, member)}>
                                            <img className="edit-icon" src={require('../images/edit-button.png')} width="22px" height="22px"/></button>
                                        <button className="delete-member-button" onClick={() => deleteMember(index, idx)}>
                                            <img className="delete-icon" src={require('../images/delete-button.png')} width="22px" height="22px"/>
                                        </button>
                                    </div>
                                    </>
                                    )}
                                </li>
                            ))}
                        </ul>
                        )}
                    </div>
                ))}

            </div>

    );
}

export default GroupTables;