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
            Average profit per game: &nbsp;
          </label>
          <label>
            {userData.gamesPlayed > 0
              ? userData.earnings / userData.gamesPlayed
              : 0}
          </label>
        </label>
      </Row>
      <Button onClick={() => navigate("/")}>Back</Button>
    </Container>
  );
};

export default ProfileData;
