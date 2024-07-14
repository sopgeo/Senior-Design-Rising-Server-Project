import React from "react";
import CsFooter from "../components/CsFooter";
import GenericHeader from "../components/GenericHeader";
import { useState, useEffect } from "react";
import "../css/GroupManagement.css";
import CsvUpload from "../components/CsvUpload";
import TagGet from "../components/TagGet";
import GroupTables from "../components/GroupTables";
import Path from "../components/Path";

function GroupManagement() {
  const [user, setUser] = useState("public");

  function getUser() {
    return user;
  }

  useEffect(() => {
    // May be needed to run functions in the return if they give loading issues
  }, []);

  const [sections, setSections] = useState([]);

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
const fetchSections = async() => {
  try {
      const response = await fetch(
          Path.buildPath("api/section/getSections", true),
          {
            method: "GET"
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch section information");
        }

        const json = await response.json();

        if (response.ok) {
          let sections = JSON.parse(json[0]);
          //console.log("JSON " +json);
          //console.log("sections " + sections);
        }

  } catch (error) {
      console.error("Error fetching data: ", error);
  }
}

  fetchSections();

  const addSection = () => {
    console.log("adding section");
    setSections([...sections, {name: "", data:null }]);
  }

  const dummyData = createDummyData(2, "2024");
  const semester = "Spring 2022"

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px',
  };


  return (
    <>
      <GenericHeader background={true} user={getUser()} />

      <div className="PageBody">
        <br />

        <h1 className="Title">Group Management</h1>
        <br />

        <div className="App">
          <div style={containerStyle}>
            <TagGet />
            <CsvUpload />
          </div>
          <div className="section-button-container">
            <button className="add-section-button" onClick={addSection}>+ Add Section</button>
          </div>
          <div className="section-container">
            <GroupTables section={semester} data={dummyData}/>
            
            {sections.map((section, index) => (
              <GroupTables key={index} section={section.name} data={section.data} />
            ))}

          </div>

        </div>

        
      </div>
      <CsFooter />
    </>
  );
}

export default GroupManagement;
