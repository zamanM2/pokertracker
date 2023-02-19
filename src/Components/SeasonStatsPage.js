import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { IoMdArrowBack } from "react-icons/io";
import { MdConstruction } from "react-icons/md";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "../css/blackBtn.css";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../Firebase/PokerApi";

const SeasonStatsPage = () => {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    getUsers().then((snapshot) => {
      const keys = Object.keys(snapshot.val());
      const _userStats = [];
      for (const userId of keys) {
        if (snapshot.val()[userId].seasonGamesPlayed >= 8) {
          _userStats.push({
            name: snapshot.val()[userId].name,
            seasonEarnings: snapshot.val()[userId].seasonEarnings,
            seasonAllIns: snapshot.val()[userId].seasonAllIns,
          });
        }
      }
      console.log(_userStats);
      setUserStats(_userStats);
    });
  }, []);

  return (
    <Container
      className="parentContainer"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <Button
        className="blackBtn"
        style={{ marginTop: "5px", marginRight: "10px" }}
        onClick={() => navigate("/")}
      >
        <IoMdArrowBack />
      </Button>
      <Row style={{ fontSize: 24, textAlign: "center", marginBottom: "20px" }}>
        <label>Coming Soon...</label>
      </Row>
      <Row>
        <MdConstruction size={150} />
      </Row>
    </Container>
  );
};

export default SeasonStatsPage;
