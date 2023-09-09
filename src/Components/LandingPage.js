import React, { useEffect, useState } from "react";
import EarningsGraph from "./EarningsGraph";
import PlayerList from "./PlayerList";
import GamesList from "./GamesList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { GiMoneyStack } from "react-icons/gi";
import {
  getUsers,
  addNewUser,
  getLatestSeasonNumber,
  getPrizePool,
} from "../Firebase/PokerApi";
import { Link } from "react-router-dom";

function LandingPage() {
  const [users, setUsers] = useState([]);
  const [isSeasonSelected, setIsSeasonSelected] = useState(true);
  const [latestSeason, setLatestSeason] = useState(0);
  const [prizePool, setPrizePool] = useState(0);

  const radios = [
    { name: `Season ${latestSeason}`, value: true },
    { name: "Overall", value: false },
  ];

  useEffect(() => {
    getUsers().then((snapshot) => {
      const keys = Object.keys(snapshot.val());
      const _users = [];
      for (const element of keys) {
        _users.push({ ...snapshot.val()[element], id: element });
      }
      setUsers(_users);
    });

    getLatestSeasonNumber().then((snapshot) => {
      setLatestSeason(snapshot.val());
    });

    getPrizePool().then((snapshot) => {
      setPrizePool(snapshot.val());
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
    <Container className="parentContainer" style={{ padding: "2px" }}>
      <Row className="text-center">
        <h2 className="argoTitle">[A]rgoBros Poker Tracker</h2>
      </Row>
      <Row className="text-center">
        <Col>
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? "outline-dark" : "outline-dark"}
                name="radio"
                value={radio.value}
                checked={isSeasonSelected === radio.value}
                onClick={() => {
                  setIsSeasonSelected(radio.value);
                }}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Col>
      </Row>
      <Row style={{ height: "250px", padding: "0px" }}>
        <EarningsGraph
          isSeasonSelected={isSeasonSelected}
          users={users.filter((user) => user.isActive === true)}
        />
      </Row>
      <Row style={{ textAlign: "center" }}>
        <h3>
          <GiMoneyStack size={30} />
          {`Prize Pool: ---`}
          <GiMoneyStack size={30} />
        </h3>
      </Row>
      <Row className="text-center">
        <h5 className="argoTitle">
          <Link
            style={{ marginBottom: "3px", color: "black" }}
            to={`/season-stats`}
          >
            <u>Season Stats</u>&#8594;
          </Link>
        </h5>
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <Col xs={6}>
          <PlayerList users={users} onAddNewUser={handleAddNewUser} />
        </Col>
        <Col xs={6} style={{ paddingRight: "20px" }}>
          <GamesList />
        </Col>
      </Row>
      <div className="footer">
        <Link to="legal">Legal</Link>
      </div>
    </Container>
  );
}

export default LandingPage;
