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
  const [bankInfo, setBankInfo] = useState({
    bankPlayer: "",
    mathOffBy: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then((snapshot) => {
      const keys = Object.keys(snapshot.val());
      const _users = [];
      for (const element of keys) {
        _users.push({
          ...snapshot.val()[element],
          id: element,
          inGame: false,
          inputEarnings: "",
          inputBuyBacks: "",
        });
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

  const handInputChange = (event, userId) => {
    for (let element of users) {
      if (element.id === userId) {
        element[event.target.name] = event.target.value;
      }
    }
    setUsers([...users]);
  };

  const calculateBank = (event) => {
    event.preventDefault();
    const usersInGame = users.filter((el) => el.inGame === true);
    const tempBankInfo = {
      bankPlayer: "",
      mathOffBy: 0,
    };
    let maxEarnings = 0;
    for (const el of usersInGame) {
      if (parseFloat(el.inputEarnings) > maxEarnings) {
        tempBankInfo.bankPlayer = el.name;
        maxEarnings = parseFloat(el.inputEarnings);
      }
      tempBankInfo.mathOffBy += parseFloat(el.inputEarnings);
    }
    setBankInfo(tempBankInfo);
  };

  return (
    <Container>
      <Row className="text-center">
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
        <Col>
          <h5>Name</h5>
        </Col>
        <Col>
          <h5>Earnings</h5>
        </Col>
        <Col>
          <h5>Buy-Backs</h5>
        </Col>
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
                <Form.Control
                  name="inputEarnings"
                  value={element.inputEarnings}
                  type="text"
                  onChange={(event) => handInputChange(event, element.id)}
                />
              </Col>
              <Col>
                <Form.Control
                  name="inputBuyBacks"
                  value={element.inputBuyBacks}
                  type="text"
                  onChange={(event) => handInputChange(event, element.id)}
                />
              </Col>
            </Row>
          ))}
      </Row>
      <Row style={{ marginBottom: "10px", marginTop: "40px" }}>
        <Col>
          <Button onClick={calculateBank}>Calculate Bank</Button>
        </Col>
      </Row>
      <Row style={{ marginBottom: "10px" }}>
        <Col>
          <Button>Save Game Session</Button>
        </Col>
      </Row>
      <Row style={{ marginBottom: "10px" }}>
        <Col>
          <Button onClick={() => navigate(-1)}>Back</Button>
        </Col>
      </Row>
      <Row>Bank is: {bankInfo.bankPlayer}</Row>
      <Row>Math is off by: {bankInfo.mathOffBy}</Row>
    </Container>
  );
};

export default AddNewGame;
