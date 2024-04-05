import React from "react";
import CsFooter from "../components/CsFooter";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "../css/Project.css";

function Project() {
  return (
    <Container className="PageBody">
      <Row>
        <h1 className="Title">Project Name</h1>
      </Row>

      <Row>
        <Col>
          <div className="Details">
            <>Place tags here</>
            <p class="text-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              mollis enim eu sollicitudin posuere. Integer bibendum molestie sem
              quis pretium. Pellentesque neque leo, volutpat tristique ante in,
              elementum commodo turpis. Phasellus eleifend vulputate rutrum.
              Nunc sed lacus a nibh volutpat tempor. Etiam dignissim, lacus eget
              commodo dictum, quam elit aliquet ex, non auctor leo risus
              ultricies ipsum. In vulputate sapien rhoncus urna bibendum
              imperdiet. Pellentesque varius risus id sapien hendrerit cursus.
            </p>
          </div>
        </Col>
        <Col>
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
        <iframe src={"https://wwf.org"} width={"75%"} height={"50%"} />
      </Row>

      <CsFooter />
    </Container>
  );
}

export default Project;
