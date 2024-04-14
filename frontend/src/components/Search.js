import React from "react";
import CsFooter from "./CsFooter";
import GenericHeader from "./GenericHeader";
import "../css/Search.css";
import { useState, useEffect } from "react";

function Search() {
  const [user, setUser] = useState("public");

  function getUser() {
    return user;
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
            <h3>Term:  </h3> 
            <select name="Term" id="Term">
              <option value="Spring_2023">Spring 2023</option>
              <option value="Summer_2023">Summer 2023</option>
              <option value="Fall_2023">Fall 2023</option>
              <option value="Spring_2024">Spring 2024</option>
            </select>
          </div>
          <div class="KeyWordsBox">
            <h3>Key Words:   </h3>
            <select name="KeyWords" id="KeyWords">
              <option value="Unity">Unity</option>
              <option value="MERN">MERN</option>
              <option value="Web">Web</option>
              <option value="Simulation">Simulation</option>
            </select>
          </div>
          <div class="SearchTextBox">
              <h3>Search:   </h3>
            <input type="text" placeholder="Search..." />
          </div>

          <div className="SearchResults"></div>
        </div>

        <br />
        <br />
        <br />

        <div>
          <table align="center">
            <tr>
              <th className="TitleCol">Title</th>
              <th className="TermCol">Term</th>
              <th className="SponsorCol">Sponsor</th>
              <th className="KeyWordsCol">Key Words</th>
            </tr>
            <tr>
              <td>Server Rising</td>
              <td>Summer 2024</td>
              <td>Rick Leinecker</td>
              <td>Node, MySQL, React, Web Development</td>
            </tr>
            <tr>
              <td>Army Reserve Mercury</td>
              <td>Fall 2024</td>
              <td>Jonathan LacKamp, Rich Mautino</td>
              <td>...</td>
            </tr>
          </table>
        </div>
        <br />
        <br />
        <br />
      </div>
      <CsFooter />
    </>
  );
}

export default Search;
