import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { getUserData, getGameHistory } from "../Firebase/PokerApi";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { IoMdArrowBack } from "react-icons/io";
import UserLineGraphs from "./PlayerLineGraph";
import PlayerGameHistory from "./PlayerGameHistory";
import "../css/blackBtn.css";

const PlayerProfileData = () => {
  const [gameHistory, setGameHistory] = useState([]);
  const [userData, setUserData] = useState({});
  let { id, name } = useParams();
  const navigate = useNavigate();
  const images = require.context("../images", true);

  useEffect(() => {
    getUserData(id).then((snapshot) => {
      setUserData(snapshot.val());
    });
  }, []);

  const computeAvgProfit = () => {
    let avg = userData.earnings / userData.gamesPlayed;
    avg = avg.toString();
    return avg.substr(0, 7);
  };

  const getPlayerImage = () => {
    try {
      return images(`./${name}.jpeg`);
    } catch (e) {
      return null;
    }
  };

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

  useEffect(() => {
    getGameHistory().then((snapshot) => {
      const gamesData = snapshot.val();
      const _gameHistory = [];
      const dates = Object.keys(gamesData);
      for (const date of dates) {
        const userIds = Object.keys(gamesData[date]);
        for (const userId of userIds) {
          if (userId === id) {
            _gameHistory.push({
              earnings: gamesData[date][userId].earnings,
              buyBacks: gamesData[date][userId].buyBacks,
              date: date,
            });
          }
        }
      }
      setGameHistory(_gameHistory);
    });
  }, []);

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
    <Container>
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
          <label style={{ fontWeight: "bold" }}>Name:&nbsp;</label>
          <label>{userData.name}</label>
        </label>
        <label>
          <label style={{ fontWeight: "bold" }}>Description:&nbsp;</label>
          <label>{getDescription()}</label>
        </label>
        <label>
          <label style={{ fontWeight: "bold" }}>Total Earnings:&nbsp; </label>
          <label>{userData.earnings}</label>
        </label>
        <label>
          <label style={{ fontWeight: "bold" }}>Buy Backs:&nbsp; </label>
          <label>{userData.buyBacks}</label>
        </label>
        <label>
          <label style={{ fontWeight: "bold" }}>Games Played:&nbsp; </label>
          <label>{userData.gamesPlayed}</label>
        </label>
        <label>
          <label style={{ fontWeight: "bold" }}>
            {" "}
            Positive - Negative :&nbsp;{" "}
          </label>
          <label>{getPositiveNegativeRatio()}</label>
        </label>
        <label>
          <label style={{ fontWeight: "bold" }}>
            Avg. profit per game: &nbsp;
          </label>
          <label>{userData.gamesPlayed > 0 ? computeAvgProfit() : 0}</label>
        </label>
      </Row>
      <Row style={{ marginTop: "5px" }}>
        <UserLineGraphs />
      </Row>
      <Row style={{ marginTop: "5px" }}>
        <PlayerGameHistory />
      </Row>
    </Container>
  );
};

export default PlayerProfileData;
