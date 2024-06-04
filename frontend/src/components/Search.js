import React from "react";
import CsFooter from "./CsFooter";
import GenericHeader from "./GenericHeader";
import "../css/Search.css";
import { useState, useEffect } from "react";
import ProjectDetails from "../components/ProjectDetails";

function Search() {
  const [user, setUser] = useState("public");
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("http://localhost:5000/api/project");

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const json = await response.json();

      if (response.ok) {
        setProjects(json);
        console.log(json);
      }
    };

    fetchProjects();
  }, []);

  function getUser() {
    return user;
  }

  function displayList() {
    return (
      <table id="myTable" align="center">
        <thead>
          <tr>
            <th className="TitleCol">Title</th>
            <th className="TermCol">Term</th>
            <th className="SponsorCol">Sponsor</th>
            <th className="KeyWordsCol">Key Words</th>
          </tr>
        </thead>
        <tbody>
          {projects &&
            projects.map((project) => (
              <tr>
                <td>{project.name}</td>
                <td>
                  {project.end_semester} {project.end_year}
                </td>
                <td>Sponsor</td>
                <td>Tags</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }

  useEffect(() => {
    // May be needed to run functions in the return if they give loading issues
  }, []);

  return (
    <>
      <GenericHeader background={true} user={getUser()} />

      <div className="PageBody">
        <br />

        <h1 className="Title">Project Lookup</h1>
        <br />

        <div class="GridContainer">
          <div class="TermBox">
            <h3>Term: </h3>
            <select name="Term" id="Term">
              <option value="Spring_2023">Spring 2023</option>
              <option value="Summer_2023">Summer 2023</option>
              <option value="Fall_2023">Fall 2023</option>
              <option value="Spring_2024">Spring 2024</option>
            </select>
          </div>
          <div class="KeyWordsBox">
            <h3>Key Words: </h3>
            <select name="KeyWords" id="KeyWords">
              <option value="Unity">Unity</option>
              <option value="MERN">MERN</option>
              <option value="Web">Web</option>
              <option value="Simulation">Simulation</option>
            </select>
          </div>
          <div class="SearchTextBox">
            <h3>Search: </h3>
            <input type="text" name="Search" placeholder="Search..." />
          </div>

          <div className="SearchResults"></div>
        </div>
        <br />
        <br />
        <br />

        <div>{displayList()}</div>
        <br />
        <br />
        <br />
      </div>

      <CsFooter />
    </>
  );
}
export default Search;
