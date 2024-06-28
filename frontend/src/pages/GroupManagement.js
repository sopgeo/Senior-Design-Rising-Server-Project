import React from "react";
import CsFooter from "../components/CsFooter";
import GenericHeader from "../components/GenericHeader";
import { useState, useEffect } from "react";
import "../css/GroupManagement.css";

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
    console.log(arr);


    for(let i = 0; i <= arr.length(); i++){

      //api search for group from a given semester

      let semInfo = {
        semester : "placeholder",
        year: "placeholder"
      };

      semesterTables += createSingleSemester(semInfo);
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