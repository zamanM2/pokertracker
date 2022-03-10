import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
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

  return (
    <Container>
      <Row style={{ textAlign: "center" }}>
        <img
          style={{
            height: "60%",
            width: "60%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          src={images(`./${name}.jpeg`)}
          alt="Photo"
        />
        <label>Name: {userData.name}</label>
        <label>Total Earnings: {userData.earnings}</label>
        <label>Buy Backs: {userData.buyBacks}</label>
        <label>Games Played: {userData.gamesPlayed}</label>
        <label>
          Average profit per game: {userData.earnings / userData.gamesPlayed}
        </label>
      </Row>
      <Button onClick={() => navigate("/")}>Back</Button>
    </Container>
  );
};

export default ProfileData;
