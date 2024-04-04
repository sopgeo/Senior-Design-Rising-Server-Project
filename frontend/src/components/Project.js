import React from "react";
import "../css/Project.css";
import CsFooter from '../components/CsFooter';
import { useState } from 'react';

function Project() {

  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  /*function onDocumentLoadSuccess(numPages){
    setNumPages(numPages);
  }*/

  return (
    <div classname="PageBody">
      <h1 className="Title">Project Name</h1>

      <div class="GridContainer">
        <div class="Details">
          <>Place tags here</>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis
            enim eu sollicitudin posuere. Integer bibendum molestie sem quis
            pretium. Pellentesque neque leo, volutpat tristique ante in,
            elementum commodo turpis. Phasellus eleifend vulputate rutrum. Nunc
            sed lacus a nibh volutpat tempor. Etiam dignissim, lacus eget
            commodo dictum, quam elit aliquet ex, non auctor leo risus ultricies
            ipsum. In vulputate sapien rhoncus urna bibendum imperdiet.
            Pellentesque varius risus id sapien hendrerit cursus.
          </p>
        </div>
        <div class="Students">
          <h3>Students</h3>
          Person 1<br />
          Person 2<br />
          Person 3<br />
          Person 4<br />
          Person 5<br />
        </div>
      </div>

      <br />
      <br />

      <div classname="PDF">
        <iframe src={"https://wwf.org"} width={"75%"} height={"50%"}/>
      </div>

      <CsFooter/>
    </div>
  );
}

export default Project;