import React from "react";
import { useState, useEffect, useRef } from "react";
import "../css/AdminTable.css";
import Path from "../components/Path";

function AdminTable() {

  //const adminList = ["Bob", "Jim", "Jack", "Matthew", "Richard"];
  //const adminList = [];
  const [adminList, setAdminList] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const ucfIdRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);


  async function fetchAdmins() {
    try {
      console.log("api fetchadmins called");
      const response = await fetch(
        Path.buildPath("api/user/getAdmins", true),
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get admins");
      }

      const json = await response.json();

      if (response.ok) {
        setAdminList(json);
      }

    } catch (error) {
      console.error("Could not fetch admins");
    }
  }

  useEffect(() => {
    fetchAdmins();
  }, []);

  const addAdmin = async() => {
    try {
      const userData = {
          ucf_id: ucfIdRef.current.value,
          password: ucfIdRef.current.value,
          group_id: 2000,
          first_name: firstNameRef.current.value,
          last_name: lastNameRef.current.value,
          type: "admin",
          section: null
      }
      const token = JSON.parse(localStorage.getItem('user')).token
      const response = await fetch(
          Path.buildPath("api/user/createUser", true),
          {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          }
        )
        const json = await response.json()
        if (response.ok) {
          /*
          let updatedGroup = JSON.parse(JSON.stringify(groupData));
          updatedGroup[groupIndex].users.push(json)
          setGroupData(updatedGroup); 
          */
          let updatedAdmins = JSON.parse(JSON.stringify(adminList));
          updatedAdmins.push(json);
          setAdminList(updatedAdmins);
        }
  }
  catch (error) {
      console.log("failure to create admin with ucf_id " + ucfIdRef.current.value)
    }
  }

  const deleteAdmin = async(ucf_id, index) =>{
    try {

      const confirm = window.confirm("Are you sure you want to delete this admin?");
      if(!confirm){
        return;
      }

      const token = JSON.parse(localStorage.getItem('user')).token
      const response = await fetch(
          Path.buildPath("api/user/deleteUser", true),
          {
            method: "POST",
            body: JSON.stringify({ucf_id: ucf_id}),
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          }
        )
        if (response.ok) {
          /*
          let updatedGroup = JSON.parse(JSON.stringify(groupData));
          updatedGroup[groupIndex].users.splice(userIndex, 1);
          setGroupData(updatedGroup);
          */
          let updatedAdmins = JSON.parse(JSON.stringify(adminList));
          updatedAdmins.splice(index, 1);
          setAdminList(updatedAdmins);
        }
  }
  catch (error) {
      console.log("failure to delete user with ucf_id " + ucf_id)
  }
  }

  return (

    <div className="admin-table">
      <div className="admin-header">
        <h2>Administrators</h2>
        <button 
          className={`dropdown-button group-button ${isExpanded ? `rotated` : ``} `}
          onClick={() => setIsExpanded(!isExpanded)}> 
          <img src={require('../images/white-dropdown-button.png')} width="22px" height="22px"/>
        </button>
      </div>
      <div className="admin-list-container">
        <ul className="admin-list">
          {isExpanded && adminList.map((admin, idx) => (
            <li key={idx} className="admin-row">
              <p className="col1"> {admin.ucf_id} </p>
              <p className="col2"> {admin.first_name} </p> 
              <p className="col3"> {admin.last_name} </p>
              <button className="delete-admin-button" onClick={() => deleteAdmin(admin.ucf_id, idx)}>
                <img className="delete-icon" src={require('../images/delete-button.png')} width="22px" height="22px" />
              </button>
            </li>
          ))}
          {isExpanded && (
          <li className="input-row">
            <div className="ucf-id-input">
              <p className="ucf-id-name">UCF ID:</p>
              <input className="ucf-id-input-field" ref={ucfIdRef}></input>
            </div>
            <div className="first-name-input">
              <p className="first-name-name">First Name:</p>
              <input className="first-name-field" ref={firstNameRef}></input>
            </div>
            <div className="last-name-input">
              <p className="last-name-name">Last Name:</p>
              <input className="last-name-field" ref={lastNameRef}></input>
            </div>
            <button className="add-admin" id="add-user" onClick={() => addAdmin()} >Add Admin</button>
          </li>
          )}
        </ul>
      </div>
    </div>

  );
}

export default AdminTable;