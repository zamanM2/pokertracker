import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { IoMdArrowBack } from "react-icons/io";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import UserSeasonStats from "./UserSeasonStats";
import "../css/blackBtn.css";
import { useNavigate } from "react-router-dom";
import { getGameHistory, getPrizePool, getUsers } from "../Firebase/PokerApi";
import { seasonEarningsCompare, pointsCompare } from "../utils/utils";
import Col from "react-bootstrap/Col";
import {
  saveSeasonStats,
  getSeasonStatsData,
  getLatestSeasonNumber,
} from "../Firebase/PokerApi";
import { toast, ToastContainer } from "react-toastify";

const SeasonStatsPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    getSeasonStatsData(1).then((snapshot) => {
      const _stats = [];
      const keys = Object.keys(snapshot.val());
      for (const userName of keys) {
        _stats.push(snapshot.val()[userName]);
      }
      _stats.sort(pointsCompare);
      setStats(_stats);
    });
  }, []);

  const handleSaveSeasonStats = async () => {
    const statsMap = new Map();
    const userStats = await calculateCurrentSeasonStats();
    for (let i = 0; i < userStats.length; i++) {
      statsMap.set(userStats[i].name, userStats[i]);
    }
    const latestSeason = await getLatestSeasonNumber().then((snapshot) => {
      return snapshot.val();
    });
    await saveSeasonStats(statsMap, latestSeason).then(() => {
      toast.success("Season Stats Saved");
    });
  };

  const calculateCurrentSeasonStats = async () => {
    return await getUsers().then((snapshot) => {
      const keys = Object.keys(snapshot.val());
      const userStats = [];
      for (const userId of keys) {
        if (snapshot.val()[userId].seasonGamesPlayed >= 7) {
          userStats.push({
            name: snapshot.val()[userId].name,
            seasonEarnings: snapshot.val()[userId].seasonEarnings,
            seasonAllIns: snapshot.val()[userId].seasonAllIns,
            points: snapshot.val()[userId].seasonAllIns * 0.1,
          });
        }
      }
      computeSeasonEarningsPoints(userStats);
      computeMostMoneyInOneGameSessionPoints(userStats);
      computeLongestWinStreakPoints(userStats);
      computeBestWinRatioPoints(userStats);
      userStats.sort(pointsCompare);
      return userStats;
    });
  };

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

  const computeBestWinRatioPoints = async (stats) => {
    const winner = await getGameHistory().then((snapshot) => {
      const winRatio = new Map();
      const seasons = Object.keys(snapshot.val());
      let gamesData = snapshot.val()[seasons[seasons.length - 1]]; //all games in latest season
      const dates = Object.keys(gamesData);
      for (const date of dates) {
        // iterate through all games
        const userIds = Object.keys(gamesData[date]); // users in a game
        for (const userId of userIds) {
          let earnings = gamesData[date][userId].earnings;
          let name = gamesData[date][userId].name;
          if (winRatio.get(name) === undefined) {
            //first time putting into map
            if (parseFloat(earnings) > 0) {
              winRatio.set(name, { wins: 1, losses: 0 });
            } else if (parseFloat(earnings) < 0) {
              winRatio.set(name, { wins: 0, losses: 1 });
            }
          } else {
            // not first time putting into map
            if (parseFloat(earnings) > 0) {
              winRatio.set(name, {
                wins: winRatio.get(name).wins + 1,
                losses: winRatio.get(name).losses,
              });
            } else if (parseFloat(earnings) < 0) {
              winRatio.set(name, {
                wins: winRatio.get(name).wins,
                losses: winRatio.get(name).losses + 1,
              });
            }
          }
        }
      }
      let winner = { name: "N/a", winPercent: 0 };
      for (let [name, record] of winRatio) {
        let currentPercent = record.wins / (record.wins + record.losses);
        if (currentPercent > winner.winPercent) {
          winner.name = name;
          winner.winPercent = currentPercent;
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
      <ToastContainer autoClose={3000} hideProgressBar />
      <Button
        className="blackBtn"
        style={{ marginTop: "5px", marginRight: "10px" }}
        onClick={() => navigate("/")}
      >
        <IoMdArrowBack />
      </Button>
      <Row
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "30px" }}
      >
        <label>Season 1 Results</label>
      </Row>
      <UserSeasonStats player={stats[0]} place={1} />
      <UserSeasonStats player={stats[1]} place={2} />
      <UserSeasonStats player={stats[2]} place={3} />
      <Row style={{ marginBottom: "5px" }}>
        <Col>
          <Button className="blackBtn" onClick={handleSaveSeasonStats}>
            Save Season Stats
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SeasonStatsPage;
