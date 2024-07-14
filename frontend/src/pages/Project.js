/* * * * * * * * * *
 *     Imports     *
 * * * * * * * * * */
import React from "react";
import CsFooter from "../components/CsFooter";
import GenericHeader from "../components/GenericHeader";
import "../css/Project.css";
import { useState, useEffect } from "react";
import Path from "../components/Path";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
  const [tags, setTags] = useState([]);
  const [students, setStudents] = useState([]);
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
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const json = await response.json();

      if (response.ok) {
        //console.log(json);
        json.hasOwnProperty("name")
          ? setProjectName(json.name)
          : setProjectName("");
        json.hasOwnProperty("description")
          ? setDescription(json.description)
          : setDescription("");
        json.hasOwnProperty("sponsor")
          ? setSponsor(json.sponsor)
          : setSponsor("");
        try {
          setShow(Path.buildPath(json.documents[0].filepath, false));
        } catch {
          setShow("");
        }
        try {
          setStudents(json.group.users);
        } catch {
          setStudents([]);
        }
        try {
          setTags(json.tags);
        } catch {
          setTags([]);
        }
      }
    };

    fetchProject();
  }

  function getUser() {
    return user;
  }

  function getName() {
    if(projectName != ""){
      return (
        <>
          <br />
          <h1 className="Title">{projectName}</h1>
          <br />
        </>
      );
    }else{
      return (
        <>
          <br />
          <h1 className="Title"><Skeleton/></h1>
          <br />
        </>
      );
    }
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
              <span className="Tag" key={tag.name}>
                {tag.name}
              </span>
          ))}
        </figure>
      );
    } else {
      return <></>;
    }
  }

  function getDescription() {
    if(projectName != ""){
      return <p className="Description">{description}</p>;
    }else{
      return <p className="Description"><Skeleton count={3}/></p>;
    }
  }

  /* * * * * * * * * *
   *     People      *
   * * * * * * * * * */
  function displayPeople() {
    return (
      <div className="People">
        {displayStudents()}
        {displaySponsor()}
      </div>
    );
  }

  function displaySponsor() {
    if (projectName != "") {
      return (
        <>
          <br />
          <h3>Sponsor</h3>
          <br />
          {sponsor}
        </>
      );
    }else{
      return (
        <>
          <br />
          <h3>Sponsor</h3>
          <br />
          <Skeleton/>
        </>
      );
    }
  }

  function mapStudents() {
    if (Array.isArray(students)) {
      return students.map((student) => (
        <p key={student.user_id}>{student.first_name + " " + student.last_name}</p>
      ));
    } else {
      return <></>;
    }
  }

  function displayStudents() {
    if(projectName != ""){
      return (
        <>
          <h3>Students</h3>
          <br />
          {mapStudents()}
        </>
      );
    }else{
      return (
        <>
          <h3>Students</h3>
          <br />
          <Skeleton count={5}/>
        </>
      );
    }
  }

  /* * * * * * * * * *
   *       PDF       *
   * * * * * * * * * */
  function getPDF() {
    //console.log(show);
    if (projectName == ""){
      return (
        <>
          <br />
          <br />
          <br />
          <Skeleton count={20}/>
          <br />
          <br />
          <br />
        </>
      );
    }else if (show != "") {
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
      return (
        <>
          <br />
          <br />
          <br />
          <p>No PDF provided</p>
          <br />
          <br />
          <br />
        </>
      );
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
