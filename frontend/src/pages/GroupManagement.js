import React from "react";
import CsFooter from "../components/CsFooter";
import GenericHeader from "../components/GenericHeader";
import { useState, useEffect } from "react";
import "../css/GroupManagement.css";
import CsvUpload from "../components/CsvUpload";

function GroupManagement() {
  const [user, setUser] = useState("public");

  function getUser() {
    return user;
  }

  useEffect(() => {
    // May be needed to run functions in the return if they give loading issues
  }, []);

  function renderSemester(semInfo) {
    return(
      <div className="SemesterBar">AAA</div>
    )
  }

  function renderGroup(groupInfo) {}

  return (
    <>
      <GenericHeader background={true} user={getUser()} />

      <div className="PageBody">
        <br />

        <h1 className="Title">Group Management</h1>
        <br />

        <div className="App">
        <h2>Upload CSV</h2>
        <CsvUpload />
        </div>

        {renderSemester()}
      </div>
      <CsFooter />
    </>
  );
}

export default GroupManagement;