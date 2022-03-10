import React, { useEffect, useState } from "react";
import EarningsGraph from "./EarningsGraph";
import UserList from "./UserList";
import Games from "./Games";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getUsers, addNewUser } from "../Firebase/PokerApi";

function earningsCompare(a, b) {
  if (a.earnings < b.earnings) {
    return 1;
  }
  if (a.earnings > b.earnings) {
    return -1;
  }
  return 0;
}

function LandingPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((snapshot) => {
      const keys = Object.keys(snapshot.val());
      const _users = [];
      for (const element of keys) {
        _users.push({ ...snapshot.val()[element], id: element });
      }
      setUsers(_users.sort(earningsCompare));
    });
  }, []);

  const handleAddNewUser = (event, newName) => {
    event.preventDefault();
    addNewUser(newName).then((_id) => {
      setUsers([
        ...users,
        {
          buyBacks: 0,
          earnings: 0,
          gamesPlayed: 0,
          name: `${newName}`,
          id: _id.key,
        },
      ]);
    });
  };

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
      <Row style={{ marginTop: "10px" }}>
        <Col xs={6}>
          <UserList users={users} onAddNewUser={handleAddNewUser} />
        </Col>
        <Col xs={6}>
          <Games />
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
