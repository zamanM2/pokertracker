import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const UserList = (props) => {
  return (
    <Container>
      <Row>
        <h2>Players</h2>
      </Row>
      <Row>
        <Router>
          <Row>
            {props.users.map((element) => (
              <Link to="/hello">{element.name}</Link>
            ))}
          </Row>
        </Router>
      </Row>
    </Container>
  );
};

export default UserList;
