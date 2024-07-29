// import React from "react";
import "../css/Upload.css";
import React, { useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Header from "../components/GenericHeader.js";
import TagsInput from "../components/TagsInput.js";
import CsFooter from "../components/CsFooter.js";
import Path from "../components/Path.js";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [submissionsEnabled, setSubmissionsEnabled] = useState(1);
  const [width] = useState(window.innerWidth > 600);
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({ onDrop, accept: "application/pdf" });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const [groupTitle, setGroupTitle] = useState(null);
  const [groupId, setGroupId] = useState(null);

  const getGroupInformation = async (group_id) => {
    try {
      const response = await fetch(
        Path.buildPath("api/group/getGroupById", true),
        {
          method: "POST",
          body: JSON.stringify({ group_id: group_id }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch group information");
      }

      const json = await response.json();

      if (response.ok) {
        setGroupTitle(json.title);
        setGroupId(group_id);
        console.log(json.section.submissions_enabled);
        setSubmissionsEnabled(json.section.submissions_enabled);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const validate = () => {
    const errors = {}
    if (!document.getElementById("proj-name").value) errors.name = "Name is required"

    if (!document.getElementById("proj-year").value) errors.year = "Year is required"
    else {
      const currentYear = new Date().getFullYear() + 1
      const inputYear = document.getElementById("proj-year").value

      if (!/^\d{4}$/.test(inputYear) || inputYear < 2010 || inputYear > currentYear)
        errors.year = "Invalid year"
    }

    if (!document.getElementById("proj-semester").value) errors.semester = "Semester is required"
    else if (document.getElementById("proj-semester").value !== 'Fall' &&
             document.getElementById("proj-semester").value !== 'Summer' &&
             document.getElementById("proj-semester").value !== 'Spring') errors.semester = "Semester must be Fall, Summer, Spring"

    if (!document.getElementById("proj-sponsor").value) errors.sponsor = "Sponsor is required"

    setFormErrors(errors)

    return Object.keys(errors).length === 0
  }

  const uploadProject = async () => {
    if (!validate()) return
    try {
      setLoading(true)
      const projectData = {
        group_id: groupId,
        name: document.getElementById("proj-name").value,
        sponsor: document.getElementById("proj-sponsor").value,
        sponsor_contact: null,
        description: document.getElementById("proj-desc").value,
        end_semester: document.getElementById("proj-semester").value,
        end_year: document.getElementById("proj-year").value,
      };

      const token = JSON.parse(localStorage.getItem('user')).token
      const response = await fetch(
        Path.buildPath("api/project/createProject", true),
        {
          method: "POST",
          body: JSON.stringify(projectData),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create project!");
      }

      const json = await response.json();

      //if (!json.project_id) throw new Error("Project did not create")
      const project_id = json.project_id;
      const tags = getTagState();
      assignTags(project_id, tags);
      if(selectedFile) {
        //alert("Loading")
        await uploadPDF(project_id, json.end_year, json.end_semester);
      }

      alert("You've submitted your project!");
      if (project_id == null) {
        window.open("/search", "_self");
      } else {
        window.open("/project?id=" + project_id, "_self");
      }
    } catch (error) {
      console.error("Error creating project: ", error);
    }
  };

  const assignTags = async (project_id, tags) => {
    try {
      const requests = tags.map(async (tag) => {
        let tagData = {
          tag_id: tag.value,
          project_id: project_id,
        };

        const response = await fetch(
          Path.buildPath("api/tag/assignTag", true),
          {
            method: "POST",
            body: JSON.stringify(tagData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      });

      const results = await Promise.all(requests);
      console.log("All tags assigned successfully:", results);
    } catch (error) {
      console.error("Error assigning tags:", error);
    }
  };

  const uploadPDF = async (project_id, year, semester) => {
    try {
      const formData = new FormData();
      formData.append("pdf", selectedFile);
      formData.append("projectId", project_id);
      formData.append("year", year);
      formData.append("semester", semester);

      console.log(formData);
      const token = JSON.parse(localStorage.getItem('user')).token
      const response = await fetch(Path.buildPath("api/file/upload", true), {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      return 1
    } catch (error) {
      console.error("Error uploading pdf" + error.message);
    }
  };

  const tagStateRef = useRef();

  const getTagState = () => {
    return tagStateRef.current.getOptions();
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    user != null ? getGroupInformation(user.group_id) : setGroupId(null);
  }, []);

  if (groupId != null && submissionsEnabled && width) {
    return (
      <div className="upload-page">
        <Header />
        <script src="../Pages/UploadPage.js"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        {/* <FileUploader handleChange = {handleChange} name="file" types={fileTypes} /> */}

        <div className="upload-header">
          {/* <h1>Hello, </h1> */}
          <h1>Upload your project</h1>
          <h3>Your group is: {groupTitle}</h3>
          <h4 class="h4">
            Thank you for your hard work this semester! Please upload your
            technical document to the server by filling out the form below.
          </h4>
        </div>

        <div className="project-info">

          <div className="line2">
            <div className="project-name-field">
              <div id="project-name">Project Name</div>
              <span contenteditable="false">
                <input
                  type="text"
                  id="proj-name"
                  placeholder="Type project name here..."
                  style={{borderColor: formErrors.name ? 'red' : ''}}
                >
                </input>
              </span>
            </div>

            <div className="project-year-field">
              <div id="project-year">Project Year</div>
              <span contenteditable="false">
                <input
                  type="text"
                  id="proj-year"
                  placeholder="e.g. '2024'"
                  style={{borderColor: formErrors.year ? 'red' : ''}}
                >
                </input>
              </span>
            </div>

            <div className="project-semester-field">
              <div id="project-semester">Project Semester</div>
              <span contenteditable="false">
                <input
                  type="text"
                  id="proj-semester"
                  placeholder="e.g. 'Spring'"
                  style={{borderColor: formErrors.semester ? 'red' : ''}}
                >
                </input>
              </span>
            </div>


            <div className="project-sponsor-field">
              <div id="project-sponsor">Project Sponsor</div>
              <span contenteditable="false">
                <input
                  type="text"
                  id="proj-sponsor"
                  placeholder="e.g. 'Richard Leinecker'"
                  style={{borderColor: formErrors.sponsor ? 'red' : ''}}
                >
                </input>
              </span>
            </div>
          </div>
            <div className="line1">
                <div className="tags-field">
                  <div id="tags">Tags</div>
                  <TagsInput ref={tagStateRef} />
                </div>
            </div>
            <br />
          <br />

          <div className="line3">
            <div className="tech-doc-field">
              <label id="tech-doc">Upload your technical document</label>
              <form
                action="/upload"
                method="POST"
                enctype="multipart/form-data"
              >
                <div
                  className="drop-zone"
                  {...getRootProps({ className: "dropzone" })}
                >
                  <input
                    name="file"
                    accept="application/pdf"
                    className="input-zone"
                    {...getInputProps()}
                  />
                  {isDragActive ? (
                    <div className="drop-files">
                      <p>Release to drop the file here</p>
                    </div>
                  ) : (
                    <div className="drag-area">
                      <span className="header">Drag and drop a file here</span>
                      <span className="header">
                        or <span class="buttons">select a file</span>{" "}
                        <span className="header2"> from your computer </span>{" "}
                      </span>
                      <span class="support">Supports: PDF only</span>
                      <div className="icon">
                        <i class="fas fa-upload"></i>
                        {/* <i class="fas fa-cloud-upload"></i> */}
                      </div>
                      <aside>
                        <br />
                        <ul>{files}</ul>
                      </aside>
                    </div>
                  )}
                </div>
              </form>
            </div>

            <div className="proj-desc-field">
              <div id="project-description">Project description</div>
              <span contenteditable="false">
                <textarea
                  type="text"
                  id="proj-desc"
                  placeholder="Type project description here..."
                >
                  {" "}
                </textarea>
              </span>
            </div>
          </div>

          

          <br />
          {loading ? 
          (
            <div className="loader"></div>
          ) : 
          (
          <button id="done-button" onClick={uploadProject}>
            Done
          </button>
          
          )
          }
          <div className='error-container'> 
          {formErrors.name && <div className="error-message">{formErrors.name}</div>}
          {formErrors.year && <div className="error-message">{formErrors.year}</div>}
          {formErrors.semester && <div className="error-message">{formErrors.semester}</div>}
          {formErrors.sponsor && <div className="error-message">{formErrors.sponsor}</div>}
          </div>
        </div>
        <CsFooter />
      </div>
    );
  } else if(!submissionsEnabled){
    return(
      <>
        Submissions are not currently enabled for your group. If you believe this is a mistake, 
        please contact one of your professors.
      </>
    );
  } else if (width) {
    return(
    <>
      You must be logged in and in your submission window to view this page. If
      you think you are seeing this message in error, contact one of your
      professors.
    </>);
  } else {
    return (
      <>
        Your device's screen is too small to properly display this content.
        Please use a larger device.
      </>
    );
  }
}

export default Upload;
