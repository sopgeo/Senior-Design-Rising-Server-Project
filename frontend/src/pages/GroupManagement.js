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

  const [sections, setSections] = useState([]);

  
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
          setSections(json)
          //console.log("JSON " +json);
          //console.log("sections " + sections);
        }

  } catch (error) {
      console.error("Error fetching data: ", error);
  }
}

  useEffect(() => {
    fetchSections()
  }, []);

  const addSection = () => {
    console.log("adding section");
    setSections([...sections, {name: "", data:null }]);
  }


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
            
            {sections.map((section, index) => (
              <GroupTables key={index} section={section}/>
            ))}

          </div>

        </div>

        
      </div>
      <CsFooter />
    </>
  );
}

export default GroupManagement;
