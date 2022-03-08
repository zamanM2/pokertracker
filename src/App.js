import React from "react";
import "./App.css";
import EarningsGraph from "./Components/EarningsGraph";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import UserList from "./Components/UserList";

function App() {
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
      </Row>
    </Container>
  );
}

export default App;
