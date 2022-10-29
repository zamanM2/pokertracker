import React, { useEffect, useState } from "react";
import EarningsGraph from "./EarningsGraph";
import SeasonGraph from "./SeasonGraph";
import PlayerList from "./PlayerList";
import GamesList from "./GamesList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { getUsers, addNewUser } from "../Firebase/PokerApi";
import { earningsCompare } from "../utils/utils";

function LandingPage() {
  const [users, setUsers] = useState([]);
  const [isSeasonSelected, setIsSeasonSelected] = useState(true);
  const radios = [
    { name: "Season", value: true },
    { name: "Overall", value: false },
  ];

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
      <Row className="text-center">
        <Col>
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? "outline-success" : "outline-danger"}
                name="radio"
                value={radio.value}
                checked={isSeasonSelected === radio.value}
                onChange={(e) => setIsSeasonSelected(e.currentTarget.value)}
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
      <Row style={{ height: "250px" }}>
        {isSeasonSelected ? (
          <SeasonGraph users={users.filter((user) => user.isActive === true)} />
        ) : (
          <EarningsGraph
            users={users.filter((user) => user.isActive === true)}
          />
        )}
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
