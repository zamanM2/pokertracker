import React, { useEffect, useState } from "react";
import EarningsGraph from "./EarningsGraph";
import PlayerList from "./PlayerList";
import GamesList from "./GamesList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getUsers, addNewUser } from "../Firebase/PokerApi";
import { earningsCompare } from "../utils/utils";

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
      <Row style={{ height: "250px" }}>
        <EarningsGraph users={users} />
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <Col className="playerContainer" xs={6}>
          <PlayerList users={users} onAddNewUser={handleAddNewUser} />
        </Col>
        <Col className="gameContainer" xs={6}>
          <GamesList />
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
