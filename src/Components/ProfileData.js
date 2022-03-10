import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getUserData } from "../Firebase/PokerApi";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const ProfileData = () => {
  const [userData, setUserData] = useState({});
  let { id, name } = useParams();
  const navigate = useNavigate();
  const images = require.context("../images", true);

  useEffect(() => {
    getUserData(id).then((snapshot) => {
      setUserData(snapshot.val());
    });
  }, []);

  useEffect(() => {}, [userData]);

  const computeAvgProfit = () => {
    let avg = userData.earnings / userData.gamesPlayed;
    avg = avg.toString();
    return avg.substr(0, 7);
  };

  const getDescription = () => {
    switch (name) {
      case "ALamin":
        return "";
      case "Anayet":
        return "I have the best hand. Let me spend the next 5 minutes pretending i don't";
      case "Fahim":
        return "Has anyone seen my calves???";
      case "Mahir":
        return "JuSt oNe mOre dRiNk. PLeAsE. I'm GoOd.";
      case "Mew":
        return "";
      case "Mirza":
        return "Nah, this extra chicken and rice is for my parents. It's not mine.";
      case "Mo-Zaman":
        return "";
      case "Momo-ashy":
        return "You can call me Dave Chappelle. I'm trash at dealing though";
      case "Ocean":
        return "#BlueLivesMatter";
      case "Rajeeb":
        return "I'm chasing the flush on the river. I have 3 spades already.";
      case "Rawan":
        return "";
      case "Sakib":
        return "I'M ALLLLL IN";
      case "Tanvir":
        return "GIMME THE MONNNEYY";
      default:
    }
  };

  return (
    <Container>
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
          <img src={images(`./${name}.jpeg`)} alt="Photo" />
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
          <label>${userData.earnings}</label>
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
            Avg. profit per game: &nbsp;
          </label>
          <label>{userData.gamesPlayed > 0 ? computeAvgProfit() : 0}</label>
        </label>
      </Row>
      <Button onClick={() => navigate("/")}>Back</Button>
    </Container>
  );
};

export default ProfileData;
