import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getGameSessions } from "../Firebase/PokerApi";
import { dateCompare } from "../utils/utils";

const Games = () => {
  const [gameSessions, setGameSessions] = useState([]);

  useEffect(() => {
    getGameSessions().then((snapshot) => {
      const keys = Object.keys(snapshot.val());
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
              <Button>
                <FaPlus />
              </Button>
            </Link>
          </h2>
        </Col>
      </Row>
      <Row>
        {[...gameSessions].sort(dateCompare).map((date) => (
          <Link key={date} to="/">
            {date.substr(5).replace("-", "/") + "/" + date.substr(0, 4)}
          </Link>
        ))}
      </Row>
    </Container>
  );
};

export default Games;
