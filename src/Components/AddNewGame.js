import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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
        _users.push({ ...snapshot.val()[element], id: element, inGame: false });
      }
      setUsers(_users);
    });
  }, []);

  const addUserToGame = (userId) => {
    for (const el of users) {
      if (el.id === userId) el.inGame = true;
    }
    setUsers([...users]);
  };

  const removeUserFromGame = (userId) => {
    for (const el of users) {
      if (el.id === userId) el.inGame = false;
    }
    setUsers([...users]);
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
        {users
          .filter((el) => el.inGame === false)
          .map((element) => (
            <Row key={element.id}>
              <Col>
                <Button
                  onClick={() => addUserToGame(element.id)}
                  style={{ margin: "3px", backgroundColor: "grey" }}
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
      <Row>
        {users
          .filter((el) => el.inGame === true)
          .map((element) => (
            <Row key={element.id}>
              <Col>
                <Button
                  onClick={() => removeUserFromGame(element.id)}
                  style={{ margin: "3px", backgroundColor: "black" }}
                >
                  X
                </Button>
                <label>{element.name}</label>
              </Col>
              <Col>
                <Form.Control name="earnings" type="text" />
              </Col>
              <Col>
                <Form.Control name="buy-backs" type="text" />
              </Col>
            </Row>
          ))}
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
