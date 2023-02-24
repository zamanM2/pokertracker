import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { IoMdArrowBack } from "react-icons/io";
import { MdConstruction } from "react-icons/md";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "../css/blackBtn.css";
import { useNavigate } from "react-router-dom";
import { getGameHistory, getUsers } from "../Firebase/PokerApi";
import { seasonEarningsCompare, pointsCompare } from "../utils/utils";

const SeasonStatsPage = () => {
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    getUsers().then((snapshot) => {
      const keys = Object.keys(snapshot.val());
      const _userStats = [];
      for (const userId of keys) {
        if (snapshot.val()[userId].seasonGamesPlayed >= 7) {
          _userStats.push({
            name: snapshot.val()[userId].name,
            seasonEarnings: snapshot.val()[userId].seasonEarnings,
            seasonAllIns: snapshot.val()[userId].seasonAllIns,
            points: snapshot.val()[userId].seasonAllIns * 0.1,
          });
        }
      }
      computeSeasonEarningsPoints(_userStats);
      computeMostMoneyInOneGameSessionPoints(_userStats);
      computeLongestWinStreakPoints(_userStats);
      _userStats.sort(pointsCompare);
      setUserStats(_userStats);
    });
  }, []);

  const computeSeasonEarningsPoints = (stats) => {
    stats.sort(seasonEarningsCompare);
    stats[0].points = stats[0].points + 3;
    stats[1].points = stats[1].points + 2;
    stats[2].points = stats[2].points + 1;
  };

  const computeMostMoneyInOneGameSessionPoints = async (stats) => {
    const winner = await getGameHistory().then((snapshot) => {
      const highest = { name: "N/a", earnings: 0 };
      const seasons = Object.keys(snapshot.val());
      let gamesData = snapshot.val()[seasons[seasons.length - 1]]; //all games in latest season
      const dates = Object.keys(gamesData);
      for (const date of dates) {
        const userIds = Object.keys(gamesData[date]);
        for (const userId of userIds) {
          if (parseFloat(gamesData[date][userId].earnings) > highest.earnings) {
            highest.earnings = gamesData[date][userId].earnings;
            highest.name = gamesData[date][userId].name;
          }
        }
      }
      return highest.name;
    });
    for (let i = 0; i < stats.length; i++) {
      if (stats[i].name === winner) {
        stats[i].points += 2;
      }
    }
  };

  const computeLongestWinStreakPoints = async (stats) => {
    const winner = await getGameHistory().then((snapshot) => {
      const winStreaks = new Map();
      const seasons = Object.keys(snapshot.val());
      let gamesData = snapshot.val()[seasons[seasons.length - 1]]; //all games in latest season
      const dates = Object.keys(gamesData);
      for (const date of dates) {
        const userIds = Object.keys(gamesData[date]);
        for (const userId of userIds) {
          let earnings = gamesData[date][userId].earnings;
          let name = gamesData[date][userId].name;
          if (winStreaks.get(name) === undefined) {
            //first time putting into map
            if (parseFloat(earnings) > 0) {
              winStreaks.set(name, { longest: 0, current: 1 }); //keep track of both longest and current longest streak
            }
          } else {
            //increase their current streak by 1
            if (parseFloat(earnings) > 0) {
              winStreaks.set(name, {
                ...winStreaks.get(name),
                current: winStreaks.get(name).current + 1,
              });
            } else {
              //set current to 0 and update their longest if needed
              let larger = Math.max(
                winStreaks.get(name).longest,
                winStreaks.get(name).current
              );
              winStreaks.set(name, {
                longest: larger,
                current: 0,
              });
            }
          }
        }
      }
      let winner = { name: "N/a", longest: 0 };
      for (let [name, streak] of winStreaks) {
        if (
          streak.longest > winner.longest ||
          streak.current > winner.longest
        ) {
          winner.name = name;
          winner.longest = Math.max(streak.longest, streak.current);
        }
      }
      return winner.name;
    });
    for (let i = 0; i < stats.length; i++) {
      if (stats[i].name === winner) {
        stats[i].points += 1;
      }
    }
  };

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
