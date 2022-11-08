import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getUsers, saveGameSession, endSeason } from "../Firebase/PokerApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { getTodaysDate } from "../utils/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowBack } from "react-icons/io";
import "../css/blackBtn.css";
import ConfirmModal from "./Modals/ConfirmModal";

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
  const [showEndSeasonModal, setEndSeasonModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [dealer, setDealer] = useState([]);
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
          inputAllIns: 0,
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

  const handleDealerChange = (event) => {
    setDealer(event.target.value);
  };

  const calculateBank = (event) => {
    event.preventDefault();
    const usersInGame = users.filter((el) => el.inGame === true);
    for (const user of usersInGame) {
      if (user.inputEarnings === "") return;
    }
    const newBankInfo = {
      bankPlayer: "",
      mathOffBy: 0,
    };
    let maxEarnings = 0;
    for (const user of usersInGame) {
      if (parseFloat(user.inputEarnings) > maxEarnings) {
        newBankInfo.bankPlayer = user.name;
        maxEarnings = parseFloat(user.inputEarnings);
      }
      newBankInfo.mathOffBy += parseFloat(user.inputEarnings);
    }
    setBankInfo(newBankInfo);
  };

  const handleSaveGameSession = async () => {
    const usersInGame = users.filter((el) => el.inGame === true);
    if (usersInGame.length === 0) return;
    for (const user of usersInGame) {
      if (user.inputEarnings === "") return;
    }
    await saveGameSession(getTodaysDate(), usersInGame, dealer);
    toast.success("Session Saved");
  };

  const endSeasonSession = async () => {
    await endSeason(users).then(() => {
      toast.success("Season Ended!");
    });
  };

  const endSeasonModalInfo = {
    title: "End Season?",
    body: "Are you sure you want to end this season?",
    visibility: showEndSeasonModal,
    okBtn: () => {
      endSeasonSession();
    },
    hideModal: () => {
      setEndSeasonModal(false);
    },
    showModal: () => {
      setEndSeasonModal(true);
    },
  };

  return (
    <div style={{ paddingLeft: "2px" }} className="parentContainer">
      <ToastContainer autoClose={3000} hideProgressBar />
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
                  style={{
                    margin: "3px",
                    backgroundColor: "grey",
                    borderColor: "grey",
                  }}
                >
                  +
                </Button>
                <label style={{ fontSize: "15px" }}>{element.name}</label>
              </Col>
            </Col>
          ))}
      </Row>
      <Row>
        <h3>
          Players in Game (
          {users.reduce((accumulator, currentValue) => {
            if (currentValue.inGame === true) return (accumulator += 1);
            else return accumulator;
          }, 0)}
          )
        </h3>
      </Row>
      <Row>
        <Col xs={5}>
          <h6>Name</h6>
        </Col>
        <Col style={{ textAlign: "center" }}>
          <h6>$$</h6>
        </Col>
        <Col style={{ textAlign: "center" }}>
          <h6>BB</h6>
        </Col>
        <Col style={{ textAlign: "left" }}>
          <h6>All-ins</h6>
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
                  style={{
                    margin: "3px",
                    backgroundColor: "#36454f",
                    borderColor: "#36454f",
                  }}
                >
                  X
                </Button>
                <label style={{ fontSize: "15px" }}>{element.name}</label>
              </Col>
              <Col xs={3}>
                <Form.Control
                  name="inputEarnings"
                  value={element.inputEarnings}
                  type="number"
                  onChange={(event) => handInputChange(event, element.id)}
                />
              </Col>
              <Col xs={2}>
                <Form.Control
                  name="inputBuyBacks"
                  value={element.inputBuyBacks}
                  type="number"
                  onChange={(event) => handInputChange(event, element.id)}
                />
              </Col>
              <Col xs={2}>
                <Form.Control
                  name="inputAllIns"
                  value={element.inputAllIns}
                  type="number"
                  onChange={(event) => handInputChange(event, element.id)}
                />
              </Col>
            </Row>
          ))}
      </Row>
      <Col>
        <h4> Dealer </h4>
        <Form.Control
          name="dealer"
          type="string"
          onChange={(event) => handleDealerChange(event)}
        />
      </Col>
      <Row style={{ marginTop: "40px" }}>
        <Col>
          <Row style={{ marginBottom: "5px" }}>
            <Col>
              <Button className="blackBtn" onClick={calculateBank}>
                Calculate Bank
              </Button>
            </Col>
          </Row>
          {currentUser && (
            <Row style={{ marginBottom: "5px" }}>
              <Col>
                <Button className="blackBtn" onClick={handleSaveGameSession}>
                  Save Game Session
                </Button>
              </Col>
            </Row>
          )}
          <Row style={{ marginBottom: "5px" }}>
            <Col>
              <Button className="blackBtn" onClick={() => navigate("/")}>
                <IoMdArrowBack />
              </Button>
            </Col>
          </Row>
          {currentUser && (
            <Row style={{ marginBottom: "5px" }}>
              <ConfirmModal info={endSeasonModalInfo} />
              <Col>
                <Button
                  className="blackBtn"
                  onClick={endSeasonModalInfo.showModal}
                >
                  End Season
                </Button>
              </Col>
            </Row>
          )}
        </Col>
        <Col>
          <Row>Bank is: {bankInfo.bankPlayer}</Row>
          <Row>Math is off by: {bankInfo.mathOffBy}</Row>
          <Row>
            {bankInfo.mathOffBy <= 0
              ? `Bank getting extra: ${Math.abs(bankInfo.mathOffBy)}`
              : `Bank is short: ${Math.abs(bankInfo.mathOffBy)}`}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AddNewGame;
