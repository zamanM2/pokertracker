import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getGameSessions } from "../Firebase/PokerApi";
import { dateCompare, formatDate } from "../utils/utils";
import "../css/blackBtn.css";

const GamesList = () => {
  const [gameSessions, setGameSessions] = useState([]);

  useEffect(() => {
    getGameSessions().then((snapshot) => {
      console.log(snapshot.val());
      const keys = Object.keys(snapshot.val());
      console.log(snapshot.val()[keys[0]]);
      console.log(snapshot.val()[keys[1]]);
      console.log(Object.keys(snapshot.val()[keys[0]]));
      // for(i=0;i<keys.length;i++){

      // }
      setGameSessions(keys);
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h2>
            Games
            <Link to="add-new-game">
              <Button className="blackBtn">
                <FaPlus />
              </Button>
            </Link>
          </h2>
        </Col>
      </Row>
      <Row>
        {[...gameSessions].sort(dateCompare).map((date) => (
          <Link
            style={{ marginBottom: "3px", color: "black" }}
            key={date}
            to={`/gamedata/${date}`}
          >
            {formatDate(date)}
          </Link>
        ))}
      </Row>
    </Container>
  );
};

export default GamesList;
