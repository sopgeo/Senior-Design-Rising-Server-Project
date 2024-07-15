import React from "react";
import { useState, useEffect, useRef } from "react";
import "../css/GroupTables.css";
import Path from "../components/Path";

function GroupTables ({section, data}) {
    const [groupData, setGroupData] = useState(section.groups || []); //Holds all of the data being displayed in this component
    const [sectionName, setSectionName] = useState(section.title);
    const [tempSectionName, setTempSectionName] = useState(""); //used when first typing the name of new section
    //For dropdown
    const [isSemesterExpanded, setIsSemesterExpanded] = useState(true);
    const [expandedGroups, setExpandedGroups] = useState({});
    //For editing group member
    const [editingMember, setEditingMember] = useState({groupIndex: null, memberIndex: null, editedName: "", originalName: ""});
    //For adding a new Group
    const [newGroupName, setNewGroupName] = useState("");
    const [isAddingNewGroup, setIsAddingNewGroup] = useState(false); //keeps track of if a new group is being added and saved
    //For adding a new member
    const [newMemberName, setNewMemberName] = useState("");
    const initAddingMemberState = Array.from({length: groupData.length}, () => false);// initializes the isAddingNewMember to be all false at the start
    const [isAddingNewMember, setIsAddingNewMember] = useState(initAddingMemberState);

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
                semester: sectionName
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

    const addGroupMember = (groupIndex) => {

        if(!isAddingNewMember[groupIndex]) {
            setGroupData(prevGroupData => {
                const newGroupData = [...prevGroupData];
                newGroupData[groupIndex] = {
                    ...newGroupData[groupIndex],
                    members: [...newGroupData[groupIndex].members, "tempvalue"]
                };
                return newGroupData;
            });

            setIsAddingNewMember(prevState => {
                const newState = [...prevState];
                newState[groupIndex] = true;
                return newState
            });
        }
        else{
            alert("Can not add two members at the same time");
        }
    };

    //Similar to saveMember name, except this one is used when it is saving a new members name
    //This is so that the edit hook is not altered
    const saveNewMemberName = (groupIndex, memberIndex) => {
        if(newMemberName.trim() !== "") {
            setGroupData((prevGroupData) => {
                const newGroupData = [...prevGroupData];
                newGroupData[groupIndex] = {
                    ...newGroupData[groupIndex], 
                    members: [...newGroupData[groupIndex].members],
                };
                newGroupData[groupIndex].members[memberIndex] = newMemberName;
                return newGroupData;
            });
            setIsAddingNewMember(prevState => {
                const newState = [...prevState];
                newState[groupIndex] = false;
                return newState
            });
            setNewMemberName("");
        }
        else{
            alert(`New group member for ${groupData[groupIndex].groupName} must have a valid name`);
        }
    }

    const saveSectionName = () => {
        if(tempSectionName.trim() !== ""){
            setSectionName(tempSectionName);
            setTempSectionName("");
        }
        else{
            alert("New section must have a valid name");
        }
    }

    const deleteUser = async(ucf_id, groupIndex, userIndex) => {
        try {
            const response = await fetch(
                Path.buildPath("api/user/deleteUser", true),
                {
                  method: "POST",
                  body: JSON.stringify({ucf_id: ucf_id}),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              if (response.ok) {
                let updatedGroup = JSON.parse(JSON.stringify(groupData));
                updatedGroup[groupIndex].users.splice(userIndex, 1);
                setGroupData(updatedGroup);
              }
        }
        catch (error) {
            console.log("failure to delete user with ucf_id " + ucf_id)
        }
    }

    const ucfIdRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);

    const addUser = async(groupIndex, group_id, section_id) => {
        try {
            const userData = {
                ucf_id: ucfIdRef.current.value,
                password: ucfIdRef.current.value,
                group_id: group_id,
                first_name: firstNameRef.current.value,
                last_name: lastNameRef.current.value,
                type: "student",
                section: section_id
            }

            const response = await fetch(
                Path.buildPath("api/user/createUser", true),
                {
                  method: "POST",
                  body: JSON.stringify(userData),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              const json = await response.json()
              if (response.ok) {
                let updatedGroup = JSON.parse(JSON.stringify(groupData));
                updatedGroup[groupIndex].users.push(json)
                setGroupData(updatedGroup);
              }
        }
        catch (error) {
            console.log("failure to create user with ucf_id " + ucfIdRef.current.value)
        }
    }

    return(
            <div className="semester-list">

                <div className="semester-title" >
                    {sectionName === "" ? (
                        <input
                            type="text"
                            value={tempSectionName}
                            onChange={(e) => setTempSectionName(e.target.value)}
                            onBlur={(e) => setTempSectionName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    saveSectionName();
                                }
                            }}
                            placeholder="Enter Section Name"
                            autoFocus
                        />
 
                    ) : ( 
                        <h2>{sectionName}</h2>
                    )}
                    <div className="semester-buttons-container">
                        <button className="add-group-button" onClick={addGroup}>+ Add Group</button>
                        <button 
                        className={`dropdown-button ${isSemesterExpanded ? 'rotated' : ''}`} 
                        onClick={toggleSemester}>
                            <img src={require('../images/black-dropdown-button.png')} width="38px" height="38px"/>
                        </button>
                    </div>
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

                            <h3>{group.title}</h3>
                            <div className="groupName-buttons-container">
                                <button className="add-member-button" onClick={() => addGroupMember(index)}>+ Add Group Member</button>
                                <button 
                                className={`dropdown-button group-button ${expandedGroups[index] ? `rotated` : ``} `}
                                onClick={() => toggleGroup(index)}> 
                                    <img src={require('../images/white-dropdown-button.png')} width="22px" height="22px"/>
                                </button>
                            </div>
                            </>
                            )}
                        </div>
                        {expandedGroups[index] && (
                        <ul className="group-member-list">
                            {group.users.map((user, idx) => (
                                <li key={idx} className="member-row">
                                    
                                    {user.ucf_id} {user.first_name} {user.last_name}
                                    <div className="member-button-container">
                                        <button className="edit-button" onClick={() => startEditingMember(index, idx, user)}>
                                            <img className="edit-icon" src={require('../images/edit-button.png')} width="22px" height="22px"/></button>
                                        <button className="delete-member-button" onClick={() => deleteUser(user.ucf_id, index, idx)}>
                                            <img className="delete-icon" src={require('../images/delete-button.png')} width="22px" height="22px"/>
                                        </button>
                                    </div>
                                </li>
                            ))}
                            <li className="member-row">
                                <div className="ucf-id-input">
                                    UCF ID:
                                    <br/>
                                    <input ref={ucfIdRef}></input>
                                </div>
                                <div className="first-name-input">
                                    First Name:
                                    <br/>
                                    <input ref={firstNameRef}></input>
                                </div>
                                <div className="last-name-input">
                                    Last Name:
                                    <br/>
                                    <input ref={lastNameRef}></input>
                                </div>
                                <button className="add-user" id="add-user"  onClick={() => addUser(index, group.group_id, section.section_id)}>Add User</button>
                            </li>

                        </ul>
                        )}
                    </div>
                ))}

            </div>

    );
}

export default GroupTables;