import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getGameSessions } from "../Firebase/PokerApi";
import { dateCompare, formatDate } from "../utils/utils";
import "../css/blackBtn.css";

const GamesList = () => {
  const [gameSessions, setGameSessions] = useState([]);
  const [numberOfSeasons, setNumberOfSeasons] = useState([]);

  useEffect(() => {
    //populate state with an array of objects {date, season}
    getGameSessions().then((snapshot) => {
      const seasons = Object.keys(snapshot.val()); //seasons
      setNumberOfSeasons([...Array(seasons.length).keys()].reverse());
      let _gameSessions = [];
      for (let i = 0; i < seasons.length; i++) {
        let dates = Object.keys(snapshot.val()[seasons[i]]);
        for (let j = 0; j < dates.length; j++) {
          _gameSessions.push({ date: dates[j], season: i });
        }
      }
      setGameSessions(_gameSessions.sort(dateCompare));
    });
  }, []);

  return (
    <Container style={{ paddingRight: "5px", backgroundColor: "#DAE2B6" }}>
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
        <Accordion>
          {[...numberOfSeasons].map((season) => (
            <Accordion.Item key={season} eventKey={season}>
              <Accordion.Header>{`Season ${season}`}</Accordion.Header>
              <Accordion.Body key={season} className="accordionBody">
                {[...gameSessions]
                  .filter((game) => game.season === season)
                  .map((game) => (
                    <div key={season + game.date}>
                      <Link
                        style={{ marginBottom: "3px", color: "black" }}
                        key={season + game.date}
                        to={`/season-${game.season}/${game.date}`}
                      >
                        {formatDate(game.date)}
                      </Link>
                      <br />
                    </div>
                  ))}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Row>
    </Container>
  );
};

export default GamesList;
