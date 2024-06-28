import React from "react";
import CsFooter from "../components/CsFooter";
import GenericHeader from "../components/GenericHeader";
import { useState, useEffect } from "react";
import "../css/GroupManagement.css";
import Path from '../components/Path';

function GroupManagement() {
  const [user, setUser] = useState("public");

  function getUser() {
    return user;
  }

  useEffect(() => {
    // May be needed to run functions in the return if they give loading issues
  }, []);

  //Returns the table which contains all of the groups for a given semester
  function createSingleSemester(semInfo){

  }

  //Will render every table from all the semesters
  function renderSemesters(semInfo) {

    let semesterTables; //return variable that holds all of the info

    //Produces an array of strings which has all the semester to this point
    let arr = new Array();
    let date = new Date();
    for (let i = 0; i <= date.getFullYear() - 2016; i++) {
      arr = arr.concat([
        "Spring " + (i + 2016).toString(),
        "Summer " + (i + 2016).toString(),
        "Fall " + (i + 2016).toString(),
      ]);
    }

    arr = arr.concat(" ");
    arr = arr.reverse();
    //console.log(arr);


    for(let i = 1; i < arr.length; i++){

      let splitWords = arr[i].split(' ');

      let semInfo = {
        semester : splitWords[0],
        year: splitWords[1]
      };

      console.log(semInfo);

      //api search for group from a given semester
      const fetchGroups = async () => {
        const response = await fetch(
          Path.buildPath("api/project/REPLACEWITHACTUALPATH", true),
          {
            method: "POST",
            body: semInfo,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch groups");
        }
  
        const json = await response.json();
  
        if (response.ok) {
          semesterTables += createSingleSemester(semInfo);
        }
      };

      //fetchGroups();
    }

    return(
      <div className="SemesterBar">AAAAA</div>
    )
  }

  function renderGroup(groupInfo) {

  }

  return (
    <>
      <GenericHeader background={true} user={getUser()} />

      <div className="PageBody">
        <br />

        <h1 className="Title">Group Management</h1>
        <br />

        {renderSemesters()}
      </div>
      <CsFooter />
    </>
  );
}

export default GroupManagement;