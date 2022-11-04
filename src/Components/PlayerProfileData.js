import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import {
  getUserData,
  getGameHistory,
  getLatestSeasonNumber,
} from "../Firebase/PokerApi";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { IoMdArrowBack } from "react-icons/io";
import PlayerGameHistory from "./PlayerGameHistory";
import PlayerLineGraph from "./PlayerLineGraph";
import "../css/blackBtn.css";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

const PlayerProfileData = () => {
  const [userData, setUserData] = useState({});
  const [gameHistory, setGameHistory] = useState([]);
  const [isSeasonSelected, setIsSeasonSelected] = useState(true);
  const [latestSeason, setLatestSeason] = useState(0);

  let { id, name } = useParams();
  const navigate = useNavigate();
  const images = require.context("../images", true);
  const radios = [
    { name: `Season ${latestSeason} `, value: true },
    { name: "Overall", value: false },
  ];

  useEffect(() => {
    getUserData(id).then((snapshot) => {
      setUserData(snapshot.val());
    });
  }, []);

  useEffect(() => {
    getLatestSeasonNumber().then((snapshot) => {
      setLatestSeason(snapshot.val());
    });

    getGameHistory().then((snapshot) => {
      const _gameHistory = [];
      const seasons = Object.keys(snapshot.val());
      for (let i = 0; i < seasons.length; i++) {
        let gamesData = snapshot.val()[seasons[i]]; //all games in a season
        const dates = Object.keys(gamesData);
        for (const date of dates) {
          const userIds = Object.keys(gamesData[date]);
          for (const userId of userIds) {
            if (userId === id) {
              _gameHistory.push({
                earnings: gamesData[date][userId].earnings,
                buyBacks: gamesData[date][userId].buyBacks,
                date: date,
                season: i,
              });
            }
          }
        }
      }
      setGameHistory(_gameHistory);
    });
  }, []);

  const getPositiveNegativeRatio = () => {
    let positiveGames = 0;
    let negativeGames = 0;
    for (let i = 0; i < gameHistory.length; i++) {
      if (gameHistory[i].earnings > 0) {
        positiveGames++;
      } else if (gameHistory[i].earnings < 0) {
        negativeGames++;
      }
    }
    return `${positiveGames} : ${negativeGames}`;
  };

  const getPositiveNegativeSeasonRatio = () => {
    let positiveGames = 0;
    let negativeGames = 0;
    for (let i = 0; i < gameHistory.length; i++) {
      if (gameHistory[i].season === latestSeason) {
        if (gameHistory[i].earnings > 0) {
          positiveGames++;
        } else if (gameHistory[i].earnings < 0) {
          negativeGames++;
        }
      }
    }
    return `${positiveGames} : ${negativeGames}`;
  };

  const computeAvgProfit = () => {
    let avg = 0;
    if (isSeasonSelected) {
      if (computeSeasonGamesPlayed() === 0) return 0;
      avg = userData.seasonEarnings / computeSeasonGamesPlayed();
    } else {
      avg = userData.earnings / userData.gamesPlayed;
    }
    avg = avg.toString();
    return avg.substr(0, 6);
  };

  const getPlayerImage = () => {
    try {
      return images(`./${name}.jpeg`);
    } catch (e) {
      return null;
    }
  };

  const computeSeasonBuyBacks = () => {
    let numBuyBacks = 0;
    gameHistory.forEach((game) => {
      if (game.season === latestSeason) {
        numBuyBacks += parseInt(game.buyBacks);
      }
    });
    return numBuyBacks;
  };

  const computeSeasonGamesPlayed = () => {
    let numGamesPlayed = 0;
    gameHistory.forEach((game) => {
      if (game.season === latestSeason) {
        numGamesPlayed += 1;
      }
    });
    return numGamesPlayed;
  };

  const getDescription = () => {
    switch (name) {
      case "Adnan":
        return "These seats are more popular than Tao downtown.";
      case "ALamin":
        return "Apple is the GOAT guys. Steve Jobs turns me on. Also check out my shiny head.";
      case "Anayet":
        return (
          'AAANND the oscar for best supporting "OMG I dont have the winning hand can you please tell me what you have" ' +
          " goes to..."
        );
      case "Fahim":
        return "Has anyone seen my calves???";
      case "Mahir":
        return "JuSt oNe mOre dRiNk. PLeAsE. I'm GoOd.";
      case "Mew":
        return "I gotta head out early guys. Peace. Peace. Peace. Peace.";
      case "Mirza":
        return "Nah, this extra chicken and rice is for my parents. It's not mine... Now let me tell you how I lost 100k in the stock market. It wasn't my fault.";
      case "Mo-Zaman":
        return "Yo guys i've been cutting for 3 years. idk why i can't lose any weight... Sooo, ya'll wanna go to Awesome Sauce after poker?";
      case "Momo-ashy":
        return "You can call me Dave Chappelle. And I'm trash at dealing. Also is this my tip? #Ashy ";
      case "Ocean":
        return "#BlueLivesMatter";
      case "Rajeeb":
        return "I'm chasing the flush on the river. I have 3 spades already.";
      case "Rawan":
        return (
          "Yo you gotta take care of me bro. Don't let me be a bad boy. Also Anayet thanks for picking me as a Groomsman. I know we go " +
          "way, way back"
        );
      case "Sakib":
        return "I'M ALLLLL INNNNN";
      case "Tanvir":
        return "GIMME THE MONNNEYY... Hey I know you guys are talking about something really important but let me interrupt you real quick and tell you about my Range Rover.";
      default:
    }
  };

  return (
    <Container className="parentContainer">
      <Button
        className="blackBtn"
        style={{ marginTop: "5px" }}
        onClick={() => navigate("/")}
      >
        <IoMdArrowBack />
      </Button>
      {(name === "Sakib" || name === "Mo-Zaman") && (
        <Button
          style={{
            marginTop: "5px",
            float: "right",
            background: "transparent",
            border: "none !important",
            fontSize: "0",
            borderColor: "white",
          }}
          onClick={() => navigate("/secret-login")}
        />
      )}
      <Row style={{ textAlign: "center" }}>
        <Row
          style={{
            display: "block",
            height: "70%",
            width: "70%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <img src={getPlayerImage()} alt="Photo" />
        </Row>
        <label>
          <b>Name:</b>&nbsp;{userData.name}
        </label>
        <label>
          <b>Description:</b>
          <br />
          {getDescription()}
        </label>
        <Row
          style={{ marginTop: "5px", marginLeft: "5px", marginBottom: "5px" }}
        >
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
        <label>
          <b>Total Earnings:</b>&nbsp;
          {isSeasonSelected ? userData.seasonEarnings : userData.earnings}
        </label>
        <label>
          <b>Buy Backs:</b>&nbsp;
          {isSeasonSelected ? computeSeasonBuyBacks() : userData.buyBacks}
        </label>
        <label>
          <b>Games Played:</b>&nbsp;
          {isSeasonSelected ? computeSeasonGamesPlayed() : userData.gamesPlayed}
        </label>
        <label>
          <b> Positive - Negative :</b>&nbsp;
          {isSeasonSelected
            ? getPositiveNegativeSeasonRatio()
            : getPositiveNegativeRatio()}
        </label>
        <label>
          <b> Avg. profit per game:</b> &nbsp;
          <label>{userData.gamesPlayed > 0 ? computeAvgProfit() : 0}</label>
        </label>
      </Row>
      <Row style={{ marginTop: "5px" }}>
        <PlayerLineGraph
          gameHistory={gameHistory}
          isSeasonSelected={isSeasonSelected}
        />
      </Row>
      <Row style={{ marginTop: "5px" }}>
        <PlayerGameHistory
          gameHistory={gameHistory}
          latestSeason={latestSeason}
        />
      </Row>
    </Container>
  );
};

export default PlayerProfileData;
