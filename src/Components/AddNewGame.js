import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getUsers, saveGameSession } from "../Firebase/PokerApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { getTodaysDate } from "../utils/utils";

function nameCompare(a, b) {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
}

const AddNewGame = () => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useAuth();

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
          inputBuyBacks: "0",
        });
      }
      setUsers(_users.sort(nameCompare));
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

  const handleSaveGameSession = () => {
    const usersInGame = users.filter((el) => el.inGame === true);
    saveGameSession(getTodaysDate(), usersInGame);
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
            <Col xs={6} style={{ marginBottom: "6px" }} key={element.id}>
              <Col>
                <Button
                  onClick={() => addUserToGame(element.id)}
                  style={{ margin: "3px", backgroundColor: "grey" }}
                >
                  +
                </Button>
                <label>{element.name}</label>
              </Col>
            </Col>
          ))}
      </Row>
      <Row>
        <h3>Players in Game</h3>
      </Row>
      <Row>
        <Col xs={5}>
          <h6>Name</h6>
        </Col>
        <Col>
          <h6>Earnings</h6>
        </Col>
        <Col>
          <h6>Buy Backs</h6>
        </Col>
      </Row>
      <Row>
        {users
          .filter((el) => el.inGame === true)
          .map((element) => (
            <Row key={element.id}>
              <Col xs={5}>
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
      {currentUser && (
        <Row style={{ marginBottom: "10px" }}>
          <Col>
            <Button onClick={handleSaveGameSession}>Save Game Session</Button>
          </Col>
        </Row>
      )}
      <Row style={{ marginBottom: "10px" }}>
        <Col>
          <Button onClick={() => navigate("/")}>Back</Button>
        </Col>
      </Row>
      <Row>Bank is: {bankInfo.bankPlayer}</Row>
      <Row>Math is off by: {bankInfo.mathOffBy}</Row>
      <Row>
        {bankInfo.mathOffBy <= 0
          ? `Bank is getting an extra ${Math.abs(bankInfo.mathOffBy)}`
          : `Bank is short: ${Math.abs(bankInfo.mathOffBy)}`}
      </Row>
    </Container>
  );
};

export default AddNewGame;
