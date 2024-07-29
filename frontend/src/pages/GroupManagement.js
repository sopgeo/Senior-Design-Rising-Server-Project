import React from "react";
import CsFooter from "../components/CsFooter";
import GenericHeader from "../components/GenericHeader";
import { useState, useEffect } from "react";
import "../css/GroupManagement.css";
import CsvUpload from "../components/CsvUpload";
import TagGet from "../components/TagGet";
import GroupTables from "../components/GroupTables";
import Path from "../components/Path";
import { jwtDecode } from "jwt-decode";
import AdminTable from "../components/AdminTable";

function GroupManagement() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) ? jwtDecode(JSON.parse(localStorage.getItem("user")).token).type : "public"
  );
  const [width, setWidth] = useState(window.innerWidth > 600);

  function getUser() {
    return user;
  }

  const [sections, setSections] = useState([]);
  const [newSectionName, setNewSectionName] = useState("");

  const fetchSections = async () => {
    console.log(JSON.parse(localStorage.getItem("user")))
    try {
      const response = await fetch(
        Path.buildPath("api/section/getSections", true),
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch section information");
      }

      const json = await response.json();

      if (response.ok) {
        setSections(json);
        //console.log("JSON " +json);
        //console.log("sections " + sections);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchSections();
  }, [refreshKey]);

  const addSection = async () => {
    if (newSectionName.trim() == "") {
      alert("Please enter valid section name");
    } else {
      const sectionData = {
        title: newSectionName,
      };

      try {
        const token = JSON.parse(localStorage.getItem("user")).token;
        const response = await fetch(
          Path.buildPath("api/section/createSection", true),
          {
            method: "POST",
            body: JSON.stringify(sectionData),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create section");
        }

        const json = await response.json();

        if (response.ok) {
          // Empty the section name box
          setNewSectionName("");

          // Get the old sections list
          let updatedSections = JSON.parse(JSON.stringify(sections));

          // Add the new section
          updatedSections.unshift(json);

          // Update the sections box
          setSections(updatedSections);
        }
      } catch (error) {
        console.error("Error creating section: ", error);
      }
    }
  };

  const deleteSection = async (sectionId) => {
    const sectionData = {
      section_id: sectionId,
    };

    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const response = await fetch(
        Path.buildPath("api/section/deleteSection", true),
        {
          method: "POST",
          body: JSON.stringify(sectionData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete section");
      }

      const json = await response.json();

      if (response.ok) {
        fetchSections();
      }
    } catch (error) {
      console.error("Error deleting section with section_id " + sectionId);
    }
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "20px",
  };

  

  if ((user==="admin" || user==="coordinator") && width) {
  } else if (width) {
    return (
      <>
        You must be logged in as an admin to view this page. If you think you
        are seeing this message in error, please double check the database.
      </>
    );
  } else {
    return (
      <>
        Your device's screen is too small to properly display this content.
        Please use a larger device.
      </>
    );
  }

  return (
    <>
      <GenericHeader background={true} user={getUser()} />

      <div className="PageBody">
        <br />

        <h1 className="Title">Group Management </h1>
        <br />

        <div className="App">
          <div style={containerStyle}>
            <TagGet />
            <CsvUpload onRefresh={handleRefresh} />
          </div>
          <div className="admin-table1">
            <AdminTable/>
          </div>
          <div className="section-button-container">
            <input
              type="text"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              placeholder="Enter Section Name"
              autoFocus
            />
            <button className="add-section-button" onClick={addSection}>
              + Add Section
            </button>
          </div>
          <div className="section-container">
            {sections.map((section, index) => (
              section.title == "Admins" ? null : (
              <GroupTables
                key={`${section.section_id}-${refreshKey}`}
                section={section}
                deleteComponent={deleteSection}
              />)
            ))}
          </div>
        </div>
      </div>
      <CsFooter />
    </>
  );
}

export default GroupManagement;
