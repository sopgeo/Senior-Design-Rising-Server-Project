import React from "react";
import CsFooter from "../components/CsFooter";
import GenericHeader from "../components/GenericHeader";
import "../css/Project.css";
import { useState, useEffect } from "react";

function Project() {
  const urlInfo = new URLSearchParams(window.location.search);
  var projectId;
  if (urlInfo.has("projectId")) {
    projectId = urlInfo.get("projectId");
  } else {
    projectId = "";
  }

  const [user, setUser] = useState("public");
  const [projectName, setProjectName] = useState("Placeholder name");
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis enim eu sollicitudin posuere. Integer bibendum molestie sem quis pretium. Pellentesque neque leo, volutpat tristique ante in, elementum commodo turpis. Phasellus eleifend vulputate rutrum. Nunc sed lacus a nibh volutpat tempor. Etiam dignissim, lacus eget commodo dictum, quam elit aliquet ex, non auctor leo risus ultricies ipsum. In vulputate sapien rhoncus urna bibendum imperdiet. Pellentesque varius risus id sapien hendrerit cursus."
  );
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
          <span className="Tag">{tag}</span>
        </>
      ));
    } else {
      return <></>;
    }
  }

  function displayStudents() {
    if (Array.isArray(students)) {
      return students.map((student) => (
        <>
          {student}
          <br />
        </>
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
    return show;
  }

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

        <h1 className="Title">{getName()}</h1>
        <br />

        <div class="GridContainer">
          <div className="Details">
            <figure className="Tags">{displayTags()}</figure>
            <p class="Description">{getDescription()}</p>
          </div>

          <div className="Students">
            <h3>Students</h3>
            <br/>
            {displayStudents()}
          </div>
        </div>

        <br />

        <div classname="PDF">
          <object
            data={getPDF()}
            type="application/pdf"
            width="100%"
            height="1000px"
          >
            WHYYYYYY
          </object>
        </div>
        <br />
        <br />
        <br />
      </div>
      <CsFooter />
    </>
  );
}

export default Project;
