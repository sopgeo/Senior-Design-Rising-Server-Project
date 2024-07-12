// import React from "react";
import "../css/Upload.css";
import React, { useState, useEffect } from "react";
import { useDropzone } from 'react-dropzone'
import Header from './GenericHeader.js'
import TagsInput from "../components/TagsInput"
import CsFooter from "../components/CsFooter";
import Path from "../components/Path";

function Upload() {
    /*const fetchData = async() => {
        try {
            const response = await fetch('http://localhost:5000/api/file/upload');
            if (!response.ok) {
                throw new Error ('Network response was not ok');
            }
            const data = await response.json();
            console.log('Data from backend:', data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }
    fetchData();*/

    const [uploadedURL, setUploadedURL] = useState(null)

    const {
        getRootProps,
        getInputProps,
        acceptedFiles,
        isDragActive,
    } = useDropzone({})

    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));

    const selectedFile = acceptedFiles[0]
    console.log(selectedFile)

    const [groupTitle, setGroupTitle] =  useState(null)
    const [userStorage, setUserStorage] = useState(null)

    const createProject = async() => {

    }

    const getGroupInformation = async(group_id) => {
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
              }

        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    useEffect (() => {
        let user = JSON.parse(localStorage.getItem("user"))
        getGroupInformation(user.group_id)
    }, [])

  return (
      <div className="upload-page">
        <Header/>
        <script src="../Pages/UploadPage.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        {/* <FileUploader handleChange = {handleChange} name="file" types={fileTypes} /> */}
        
        <div className="upload-header">
            <h1>Hello, </h1>
            <h3>Your group is: {groupTitle}</h3>
            <h4>Thank you for your hard work this semester! 
                Please upload your technical document to the 
                server by filling out the form below.</h4>
        </div>

        <div className="project-info">
            <div className="line1">
                
                <div className="tags-field">
                    <div id="tags">Tags</div>
                    <TagsInput />
                </div>
            </div>
            <br/>

            <div className="line2">
                <div className="project-name-field">
                <div id="project-name">Project Name</div>
                <span contenteditable="false">
                            <textarea type="text" id="proj-name" placeholder="Type project name here..."> </textarea>
                        </span>
                </div>

                <div className="project-year-field">
                <div id="project-year">Project Year</div>
                <span contenteditable="false">
                            <textarea type="text" id="proj-year" placeholder="Type project year here..."> </textarea>
                        </span>
                </div>

                <div className="project-semester-field">
                <div id="project-semester">Project Semester</div>
                <span contenteditable="false">
                            <textarea type="text" id="proj-semester" placeholder="Type project semester here..."> </textarea>
                        </span>
                </div>

                <div className="project-sponsor-field">
                <div id="project-sponsor">Project Sponsor</div>
                <span contenteditable="false">
                            <textarea type="text" id="proj-sponsor" placeholder="Type project sponsor here..."> </textarea>
                        </span>
                </div>
            </div>

            


            <div className="line3">
                <div className="tech-doc-field">
                <label id="tech-doc">Upload your technical document</label>
                <form
                    action="/upload"
                    method="POST" 
                    enctype="multipart/form-data"
                >
                    <div className="drop-zone" {...getRootProps({className: "dropzone"})} >
                        <input name="file" accept="application/pdf" className="input-zone" {...getInputProps() } />
                        {isDragActive ? (
                            <div className="drop-files">
                                <p>Release to drop the file here</p>
                            </div>
        
                        ) : 
                        <div className='drag-area' >
                            <span className="header">Drag and drop a file here</span>
                            <span className="header">or <span class="button">select a file</span> <span className="header2"> from your computer </span> </span>
                            <span class="support">Supports: PDF only</span>
                            <div className="icon">
                                <i class="fas fa-upload"></i>
                                {/* <i class="fas fa-cloud-upload"></i> */}
                            </div>
                            <aside>
                                <br/>
                                <ul>{files}</ul>
                            </aside>
                        </div>
                        }
                        </div>
                </form>
                </div>


                <div className="proj-desc-field">
                    <div id="project-description">Project description</div>
                    <span contenteditable="false">
                        <textarea type="text" id="proj-desc" placeholder="Type project description here..."> </textarea>
                    </span>
                </div>
            </div>

            <br/>
            <button id="done-button">Done</button>
        </div>
        <CsFooter/>
    </div>
);
}

export default Upload;