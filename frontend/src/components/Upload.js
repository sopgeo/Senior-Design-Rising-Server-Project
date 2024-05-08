import React from "react";
import "../css/Upload.css";

function Upload() {
  return (
      <div className="upload-page">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <div className="upload-header">
            <h1>Upload your project</h1>
            <h3>Enter metadata about your project and submit it for admin approval</h3>
        </div>

        <div className="user-info">
            <div className="full-name-field">
                <label id="full-name-header">Full Name</label>
                <br/>
                <input type="text" id="full-name-input"/>
            </div>

            <div className="linked-in-field">
                <label id="linked-in-header">LinkedIn</label>
                <br/>
                <input type="text" id="linked-in-input"/>
            </div>

            <div className="project-role-field">
                <label id="project-role-header">Project Role</label>
                <br/>
                <input type="text" id="project-role-input"/>
            </div>
        
            {/* <button onClick={addUser}>+</button> */}
            {/* <button onClick={removeUser}>-</button> */}
            <button id="add-button">+</button>
            <button id="remove-button">-</button>
        </div>

        <div className="project-info">
            <div className="line1">
                <div className="project-name-field">
                    <label id="project-name">Project Name</label>
                    <br/>
                    <input type="text" id="proj-name-input"/>
                </div>
                
                <div className="tags-field">
                    <label id="tags">Tags</label>
                    <br/>
                    <input type="text" id="tags-input"/>
                </div>
            </div>
            <br/>

            <div className="line2">
                <div className="tech-doc-field">
                <label id="tech-doc">Upload your technical document</label>
                    <br/>
                    <div className="drag-area">
                        <span className="header">Drag and drop a file here</span>
                        <span className="header">or <span class="button">select a file</span> <span className="header2"> from your computer </span> </span>
                        <span class="support">Supports: PDF only</span>
                        <div className="icon">
                            <i class="fas fa-upload"></i>
                            {/* <i class="fas fa-cloud-upload"></i> */}
                        </div>
                    </div>
                    {/* <input type="file" id="myfile" name="myfile" multiple></input> */}
                </div>

                <div className="proj-desc-field">
                    <label id="project-description">Project description</label>
                    <br/>
                    <input type="text" id="project-description"/>
                </div>
            </div>

            <br/>
            <button id="done-button">Done</button>
        </div>

    </div>
);
}

export default Upload;
