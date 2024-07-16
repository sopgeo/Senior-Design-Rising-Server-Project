import React from "react";
import { useState, useEffect, useRef } from "react";
import "../css/GroupTables.css";
import Path from "../components/Path";
import Switch from "react-switch";

function GroupTables ({section, data, deleteComponent}) {
    const [groupData, setGroupData] = useState(section.groups || []); //Holds all of the data being displayed in this component
    console.log(groupData)
    const [sectionName, setSectionName] = useState(section.title);
    const [sectionId, setSectionId] = useState(section.section_id);
    const [tempSectionName, setTempSectionName] = useState(""); //used when first typing the name of new section
    const [submissionsEnabled, setSubmissionsEnabled] = useState(section.submissions_enabled);
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

    function giveStatus(submitted) {
        if(submitted){
            return(
                <span className="status-submitted"></span>
            )
        }else{
            return(
                <span className="status-unsubmitted"></span>
            )
        }
    }

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

    const addGroup1
     = () => {

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


    const groupTitleRef = useRef(null);
    const addGroup = async() => {
        try {
            const groupReq = {
                section_id: section.section_id,
                title: groupTitleRef.current.value
            }

            const response = await fetch(
                Path.buildPath("api/group/createGroup", true),
                {
                  method: "POST",
                  body: JSON.stringify(groupReq),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              const json = await response.json()
              json["users"] = [];
              if (response.ok) {
                let updatedGroup = JSON.parse(JSON.stringify(groupData));
                updatedGroup.push(json)
                setGroupData(updatedGroup);
              }
        }
        catch (error) {
            console.log("failure to create group with title ")
        }
    }

    const deleteGroup = async(group_id, groupIndex, isDeletingSection) => {
        try {

            var result = true;
            if(!isDeletingSection){
                result = window.confirm(`Want to delete ${groupData[groupIndex].title} and its users?`);
            }
 
            if (!result) {
                return
            }

            for (let i = 0; i < groupData[groupIndex].users.length; i++) {
                await deleteUser(groupData[groupIndex].users[i].ucf_id, groupIndex, i)
            }

            const response = await fetch(
                Path.buildPath("api/group/deleteGroup", true),
                {
                  method: "POST",
                  body: JSON.stringify({group_id: group_id}),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              const json = await response.json()
              if (response.ok) {
                let updatedGroup = JSON.parse(JSON.stringify(groupData));
                updatedGroup.splice(groupIndex, 1)
                setGroupData(updatedGroup);
              }
        }
        catch (error) {
            console.log("failure to delete group with title " + groupData[groupIndex].title)
        }
    }

    const deleteSection = async() => {
        
        //Add a confirm to see if they really do want to delete this section
        try{

            var result = window.confirm(`Want to delete ${sectionName} and its groups?`);
            if(!result){
                return
            }
             //Delete the groups in the section
             for(let i = 0; i < groupData.length; i++){
                const temp = groupData[i];
                deleteGroup(groupData[i].group_id, i, true);
            }
            
            deleteComponent(section.section_id);
            
        }
        catch(error){
            console.log("Failure to delete Section " + sectionName);
        }
    }

    const toggleSubmissionAbility = async() => {
        try {
            let stat = submissionsEnabled ? 0 : 1;
            const response = await fetch(
                Path.buildPath("api/section/changeSubmissionStatus", true),
                {
                  method: "POST",
                  body: JSON.stringify({section_id: sectionId, status: stat}),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              console.log(response.status);
              if (response.ok) {
                setSubmissionsEnabled(!submissionsEnabled);
              }
        }
        catch (error) {
            console.log("failure to toggle submission status" + submissionsEnabled)
        }        
    }

    return(
            <div className="semester-list">

                <div className="semester-title" >       

                    <div className="title-sub-enabled-container">
                        <h2>{sectionName}</h2>
                        <div className="sub-enabled-container"> 
                            <Switch onChange={toggleSubmissionAbility} checked={submissionsEnabled} uncheckedIcon={false} checkedIcon={false} onColor="#10b710" />
                            <span className="submissions-enabled-text">{submissionsEnabled ? "Submissions Enabled" : "Submissions Disabled"}</span>
                        </div>
                    </div>

                    <div className="semester-buttons-container">
                        <button className="delete-section-button" onClick={deleteSection}>
                            <img className="delete-icon" src={require('../images/delete-button.png')} width="22px" height="22px"/>
                        </button>
                        <button 
                            className={`dropdown-button ${isSemesterExpanded ? 'rotated' : ''}`} 
                            onClick={toggleSemester}>
                            <img src={require('../images/black-dropdown-button.png')} width="38px" height="38px"/>
                        </button>
                    </div>
                </div>
                <div className="group">
                    {isSemesterExpanded && (
                        <div className="group-name">
                                <input ref={groupTitleRef} placeholder="Enter Group Name" ></input>
                                <button id="add-group"  onClick={() => addGroup()}>+ Add Group</button>
                        </div>
                    )}
                </div>
                {isSemesterExpanded && groupData.map((group, index) => (
                    <div className="group" key={group.group_id}>
                        
                        <div className="group-name">
                            <div>
                                {giveStatus(group.submitted)}
                                <h3>{group.submitted}</h3>
                                <h3>{group.title}</h3>
                            </div>
                            <div className="groupName-buttons-container">
                                <button className="delete-group-button" onClick={() => deleteGroup(group.group_id, index, false)}>
                                    <img className="delete-icon" src={require('../images/delete-button-white.png')} width="22px" height="22px"/>
                                </button>
                                <button 
                                    className={`dropdown-button group-button ${expandedGroups[index] ? `rotated` : ``} `}
                                    onClick={() => toggleGroup(index)}> 
                                    <img src={require('../images/white-dropdown-button.png')} width="22px" height="22px"/>
                                </button>
                            </div>
                            
                        </div>
                        {expandedGroups[index] && (
                        <ul className="group-member-list">
                            {group.users.map((user, idx) => (
                                <li key={idx} className="member-row">
                                    
                                    {user.ucf_id} {user.first_name} {user.last_name}
                                    <div className="member-button-container">
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