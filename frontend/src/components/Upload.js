// import React from "react";
import "../css/Upload.css";
import React, { useState } from "react";
import { useDropzone } from 'react-dropzone'
import Header from './GenericHeader.js'
import TagsInput from "../components/TagsInput"

function Upload() {
    const fetchData = async() => {
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
    fetchData();

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


  return (
      <div className="upload-page">
        <Header/>
        <script src="../Pages/UploadPage.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        {/* <FileUploader handleChange = {handleChange} name="file" types={fileTypes} /> */}
        
        <div className="upload-header">
            <h1>Upload your project</h1>
            <h3>Enter metadata about your project and submit it for admin approval</h3>
        </div>

        {/* first member field */}
        <div className="user-info">
            <div className="full-name-field">
                <div id="full-name-header">Full Name</div>
                {/* <br/> */}
                <input type="text" id="full-name-input" placeholder="Type name here..."/>
            </div>

            <div className="linked-in-field">
                <div id="linked-in-header">LinkedIn</div>
                <input type="text" id="linked-in-input" placeholder="Type LinkedIn here..."/>
            </div>

            <div className="project-role-field">
                <div id="project-role-header">Project Role</div>
                <input type="text" id="project-role-input" placeholder="Type Project Role here..."/>
            </div>
        </div>

        {/* second member field */}
        <div className="user-info">
            <div className="full-name-field">
                <div id="full-name-header">Full Name</div>
                {/* <br/> */}
                <input type="text" id="full-name-input" placeholder="Type name here..."/>
            </div>

            <div className="linked-in-field">
                <div id="linked-in-header">LinkedIn</div>
                <input type="text" id="linked-in-input" placeholder="Type LinkedIn here..."/>
            </div>

            <div className="project-role-field">
                <div id="project-role-header">Project Role</div>
                <input type="text" id="project-role-input" placeholder="Type Project Role here..."/>
            </div>
        </div>

        {/* third member field */}
        <div className="user-info">
            <div className="full-name-field">
                <div id="full-name-header">Full Name</div>
                {/* <br/> */}
                <input type="text" id="full-name-input" placeholder="Type name here..."/>
            </div>

            <div className="linked-in-field">
                <div id="linked-in-header">LinkedIn</div>
                <input type="text" id="linked-in-input" placeholder="Type LinkedIn here..."/>
            </div>

            <div className="project-role-field">
                <div id="project-role-header">Project Role</div>
                <input type="text" id="project-role-input" placeholder="Type Project Role here..."/>
            </div>
        </div>

        {/* fourth member field */}
        <div className="user-info">
            <div className="full-name-field">
                <div id="full-name-header">Full Name</div>
                {/* <br/> */}
                <input type="text" id="full-name-input" placeholder="Type name here..."/>
            </div>

            <div className="linked-in-field">
                <div id="linked-in-header">LinkedIn</div>
                <input type="text" id="linked-in-input" placeholder="Type LinkedIn here..."/>
            </div>

            <div className="project-role-field">
                <div id="project-role-header">Project Role</div>
                <input type="text" id="project-role-input" placeholder="Type Project Role here..."/>
            </div>
        </div>

        {/* fifth member field */}
        <div className="user-info">
            <div className="full-name-field">
                <div id="full-name-header">Full Name</div>
                {/* <br/> */}
                <input type="text" id="full-name-input" placeholder="Type name here..."/>
            </div>

            <div className="linked-in-field">
                <div id="linked-in-header">LinkedIn</div>
                <input type="text" id="linked-in-input" placeholder="Type LinkedIn here..."/>
            </div>

            <div className="project-role-field">
                <div id="project-role-header">Project Role</div>
                <input type="text" id="project-role-input" placeholder="Type Project Role here..."/>
            </div>
        </div>

        {/* sixth member field */}
        <div className="user-info">
            <div className="full-name-field">
                <div id="full-name-header">Full Name</div>
                {/* <br/> */}
                <input type="text" id="full-name-input" placeholder="Type name here..."/>
            </div>

            <div className="linked-in-field">
                <div id="linked-in-header">LinkedIn</div>
                <input type="text" id="linked-in-input" placeholder="Type LinkedIn here..."/>
            </div>

            <div className="project-role-field">
                <div id="project-role-header">Project Role</div>
                <input type="text" id="project-role-input" placeholder="Type Project Role here..."/>
            </div>
        </div>
        

        <div className="project-info">
            <div className="line1">
                <div className="project-name-field">
                    <div id="project-name">Project Name</div>
                    <input type="text" id="proj-name-input" placeholder="Type project name here..."/>
                </div>
                
                <div className="tags-field">
                    <div id="tags">Tags</div>
                    <TagsInput />
                </div>
            </div>
            <br/>

            <div className="line2">
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
                    <span contenteditable="true">
                        <textarea type="text" id="proj-desc" placeholder="Type project description here..."> </textarea>
                    </span>
                </div>
            </div>

            <br/>
            <button id="done-button">Done</button>
        </div>

    </div>
);
}

export default Upload;