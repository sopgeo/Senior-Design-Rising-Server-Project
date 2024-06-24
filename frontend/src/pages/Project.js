import React from "react";
import CsFooter from "../components/CsFooter";
import GenericHeader from "../components/GenericHeader";
import "../css/Project.css";
import { useState, useEffect } from "react";
import Path from "../components/Path";

function Project() {
  const urlInfo = new URLSearchParams(window.location.search);
  var projectId;
  if (urlInfo.has("id")) {
    projectId = urlInfo.get("id");
  } else {
    projectId = "";
  }

  const [user, setUser] = useState("public");
  const [projectName, setProjectName] = useState("Name");
  const [description, setDescription] = useState("Description");
  const [show, setShow] = useState(
    "http://localhost:3000/Files/2018/Fall/Projects/402/DesignDocument.pdf"
  );
  const [tags, setTags] = useState([
    "test",
    "this is another tag",
    "need to fill out space",
    "hi",
    "text",
    "more text",
    "continuing",
    "other things",
    "hoping this wraps",
    "very long piece of text to fill up space",
    "this shouldn't overflow please",
  ]);
  const [students, setStudents] = useState([
    "Salvador Felipe Jacinto Dalí y Domenech",
    "Student2",
    "Student3",
    "Student4",
    "Student5",
  ]);

  function displayTags() {
    if (Array.isArray(tags)) {
      return tags.map((tag) => (
        <>
          <span className="Tag" key={tag}>{tag}</span>
        </>
      ));
    } else {
      return <></>;
    }
  }

  function displayStudents() {
    if (Array.isArray(students)) {
      return students.map((student) => (
        <p key={student}>
          {student}
        </p>
      ));
    } else {
      return <></>;
    }
  }

  function getName() {
    return projectName;
  }

  function getDescription() {
    return description;
  }

  function getPDF() {
    console.log(show);
    if (show != "") {
      return (
        <>
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

  function getUser() {
    return user;
  }

  useEffect(() => {
    getProject();
  }, []);

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
        json.hasOwnProperty("documents")
          ? setShow(Path.buildPath(json.documents[0].filepath, false))
          : setShow("");
      }
    };

    fetchProject();
    console.log("Ran");
  }

  return (
    <>
      <GenericHeader background={true} user={getUser()} />

      <div className="PageBody">
        <br />

        <h1 className="Title">{getName()}</h1>
        <br />

        <div className="GridContainer">
          <div className="Details">
            <figure className="Tags">{displayTags()}</figure>
            <p className="Description">{getDescription()}</p>
          </div>

          <div className="Students">
            <h3>Students</h3>
            <br />
            {displayStudents()}
          </div>
        </div>

        <div className="Spacer"></div>

        <br />

        {getPDF()}
      </div>
      <CsFooter />
    </>
  );
}

export default Project;
