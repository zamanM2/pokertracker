import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { getUsers } from "../Firebase/PokerApi";
import { useNavigate } from "react-router-dom";

const AddNewGame = () => {
  const [usersToAdd, setUsersToAdd] = useState([]);
  const [usersInGame, setUsersInGame] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then((snapshot) => {
      const keys = Object.keys(snapshot.val());
      const _users = [];
      for (const element of keys) {
        _users.push({ ...snapshot.val()[element], id: element });
      }
      setUsersToAdd(_users);
    });
  }, []);

  const addUserToGame = (userId) => {
    console.log(userId);
  };

  return (
    <Container>
      <Row>
        <h1>Add New Game Session</h1>
      </Row>
      <Row>
        <h3>Players to Add </h3>
      </Row>
      <Row>
        {usersToAdd.map((element) => (
          <Row>
            <Col>
              <Button
                onClick={() => addUserToGame(element.id)}
                style={{ margin: "3px" }}
              >
                +
              </Button>
              <label>{element.name}</label>
            </Col>
          </Row>
        ))}
      </Row>
      <Row>
        <h3>Players in Game</h3>
      </Row>
      <Row style={{ marginBottom: "10px" }}>
        <Col>
          <Button>Calculate Bank</Button>
        </Col>
      </Row>
      <Row style={{ marginBottom: "10px" }}>
        <Col>
          <Button>Save Game Session</Button>
        </Col>
      </Row>
      <Row style={{ marginBottom: "10px" }}>
        <Col>
          <Button onClick={() => navigate(-1)}>Back to Home</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNewGame;
