import React from "react";
import CsFooter from "../components/CsFooter";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "../css/Project.css";
import { useState } from "react";

function Project() {
  const [projectName, setProjectName] = useState("Placeholder name");
  const [description, setDescription] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis enim eu sollicitudin posuere. Integer bibendum molestie sem quis pretium. Pellentesque neque leo, volutpat tristique ante in, elementum commodo turpis. Phasellus eleifend vulputate rutrum. Nunc sed lacus a nibh volutpat tempor. Etiam dignissim, lacus eget commodo dictum, quam elit aliquet ex, non auctor leo risus ultricies ipsum. In vulputate sapien rhoncus urna bibendum imperdiet. Pellentesque varius risus id sapien hendrerit cursus.");

  function displayTags() {
    let tempTags = [
      "word",
      "this is another tag",
      "need to fill out space",
      "hi",
      "text",
      "more text",
      "continuing",
      "other things" /*, "hoping this wraps", "very long piece of text to fill up space", "this shouldn't overflow please"*/,
    ];

    if (Array.isArray(tempTags)) {
      return tempTags.map((tag) => <span className="Tag">{tag}</span>);
    } else {
      return <></>;
    }
  }

  return (
    <>
      <Container className="PageBody">
        <br />
        <br />
        <br />

        <Row>
          <h1 className="Title">{projectName}</h1>
        </Row>

        <Row>
          <Col xs={7}>
            <div className="Details">
              {displayTags()}

              <p class="Details">{description}</p>
            </div>
          </Col>
          <Col auto>
            <div className="Students">
              <h3>Students</h3>
              Person 1<br />
              Person 2<br />
              Person 4<br />
              Person 4<br />
              Person 5<br />
            </div>
          </Col>
        </Row>

        <Row classname="PDF">
          <iframe src={"https://wwf.org"} width={"75%"} height={"1000px"} />
        </Row>
        <br />
        <br />
        <br />
      </Container>
      <CsFooter />
    </>
  );
}

export default Project;
