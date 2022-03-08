import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { getUsers } from "../Firebase/PokerApi";
import { useNavigate } from "react-router-dom";

const AddNewGame = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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
      <Row>
        <h1>Add New Game Session</h1>
      </Row>
      <Row>
        <h3>Players to Add </h3>
      </Row>
      <Row>
        <h3>Players in Game</h3>
      </Row>
      <Row>
        <Col xs={1}>
          <Button onClick={() => navigate(-1)} className="blackBtn">
            Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNewGame;
