import React from "react";
import EarningsGraph from "./EarningsGraph";
import UserList from "./UserList";
import Games from "./Games";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function LandingPage() {
  return (
    <Container>
      <Row>
        <Col>
          <EarningsGraph />
        </Col>
      </Row>
      <Row>
        <Col>
          <UserList />
        </Col>
        <Col>
          <Games />
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
