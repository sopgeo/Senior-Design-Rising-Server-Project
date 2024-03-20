import React from "react";
import "../css/Upload.css";

function Upload() {
  return (
    <div className="upload-page">
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
                    <input type="text" id="upload-project-placeholder"/>
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
