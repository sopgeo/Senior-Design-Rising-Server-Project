/* * * * * * * * * *
 *     Imports     *
 * * * * * * * * * */
import React from "react";
import CsFooter from "../components/CsFooter";
import GenericHeader from "../components/GenericHeader";
import "../css/Project.css";
import { useState, useEffect } from "react";
import Path from "../components/Path";

/* * * * * * * * * *
 *     Project     *
 * * * * * * * * * */
function Project() {
  // Sets up variables we're using
  const [user, setUser] = useState("public");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [show, setShow] = useState("");
  const [tags, setTags] = useState(["tag1", "tag2", "tag3"]);
  const [students, setStudents] = useState([
    "Student1",
    "Student2",
    "Student3",
    "Student4",
    "Student5",
  ]);
  const urlInfo = new URLSearchParams(window.location.search);
  var projectId = "";
  if (urlInfo.has("id")) {
    projectId = urlInfo.get("id");
  }

  /* * * * * * * * * *
   *   API + basic   *
   * * * * * * * * * */
  function getProject() {
    const fetchProject = async () => {
      let url =
        Path.buildPath("api/project/getProject?project_id=", true) + projectId;
      console.log(url);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const json = await response.json();

      if (response.ok) {
        console.log(json);
        json.hasOwnProperty("name")
          ? setProjectName(json.name)
          : setProjectName("");
        json.hasOwnProperty("description")
          ? setDescription(json.description)
          : setDescription("");
        json.hasOwnProperty("sponsor")
          ? setSponsor(json.sponsor)
          : setSponsor("");
        json.hasOwnProperty("documents")
          ? setShow(Path.buildPath(json.documents[0].filepath, false))
          : setShow("");
      }
    };

    fetchProject();
    console.log("Ran");
  }

  function getUser() {
    return user;
  }

  function getName() {
    return (
      <>
        <br />
        <h1 className="Title">{projectName}</h1>
        <br />
      </>
    );
  }

  /* * * * * * * * * *
   *    Text Info    *
   * * * * * * * * * */
  function displayTextInfo() {
    return (
      <div className="GridContainer">
        {displayDetails()}
        {displayPeople()}
      </div>
    );
  }

  function displayDetails() {
    return (
      <div className="Details">
        {displayTags()}
        {getDescription()}
      </div>
    );
  }

  function displayTags() {
    if (Array.isArray(tags)) {
      return (
        <figure className="Tags">
          {tags.map((tag) => (
            <>
              <span className="Tag" key={tag}>
                {tag}
              </span>
            </>
          ))}
        </figure>
      );
    } else {
      return <></>;
    }
  }

  function getDescription() {
    return <p className="Description">{description}</p>;
  }

  /* * * * * * * * * *
   *     People      *
   * * * * * * * * * */
  function displaySponsor() {
    if (sponsor != "") {
      return (
        <>
          <br />
          <h3>Sponsor</h3>
          <br />
          {sponsor}
        </>
      );
    }
  }

  function mapStudents() {
    if (Array.isArray(students)) {
      return students.map((student) => <p key={student}>{student}</p>);
    } else {
      return <></>;
    }
  }

  function displayStudents() {
    return (
      <>
        <h3>Students</h3>
        <br />
        {mapStudents()}
      </>
    );
  }

  function displayPeople() {
    return (
      <div className="People">
        {displayStudents()}
        {displaySponsor()}
      </div>
    );
  }

  /* * * * * * * * * *
   *       PDF       *
   * * * * * * * * * */
  function getPDF() {
    console.log(show);
    if (show != "") {
      return (
        <>
          <br />
          <div className="PDF">
            <object
              data={show}
              type="application/pdf"
              width="100%"
              height="1000px"
            ></object>
          </div>
          <br />
          <br />
          <br />
        </>
      );
    } else {
      return <p>Nope</p>;
    }
  }

  /* * * * * * * * * *
   *   Update Data   *
   * * * * * * * * * */
  useEffect(() => {
    getProject();
  }, []);

  /* * * * * * * * * *
   *   Design Page   *
   * * * * * * * * * */
  return (
    <>
      <GenericHeader background={true} user={getUser()} />

      <div className="PageBody">
        {getName()}
        {displayTextInfo()}
        {getPDF()}
      </div>

      <CsFooter />
    </>
  );
}
export default Project;