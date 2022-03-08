import React from "react";
import "./App.css";
import EarningsGraph from "./Components/EarningsGraph";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserList from "./Components/UserList";
import Games from "./Components/Games";

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
        <Col>
          <Games />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
