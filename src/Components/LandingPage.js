import React, { useEffect, useState } from "react";
import EarningsGraph from "./EarningsGraph";
import UserList from "./UserList";
import Games from "./Games";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getUsers } from "../Firebase/PokerApi";

function LandingPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((snapshot) => {
      const keys = Object.keys(snapshot.val());
      const _users = [];
      for (const element of keys) {
        _users.push(snapshot.val()[element]);
      }
      setUsers(_users);
    });
  }, [users]);

  return (
    <Container>
      <Row className="text-center">
        <h2>[A]rgoBros Poker Tracker</h2>
      </Row>
      <Row>
        <Col>
          <EarningsGraph users={users} />
        </Col>
      </Row>
      <Row>
        <Col>
          <UserList users={users} />
        </Col>
        <Col>
          <Games />
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
