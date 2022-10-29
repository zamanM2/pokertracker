import React, { useState, useEffect } from "react";
import { getGameHistory } from "../Firebase/PokerApi";
import { useParams, Link } from "react-router-dom";
import { formatDate, gameDateCompare } from "../utils/utils";

const PlayerGameHistory = (props) => {
  const [gameHistory, setGameHistory] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    getGameHistory().then((snapshot) => {
      const _gameHistory = [];
      const seasons = Object.keys(snapshot.val());
      for (let i = 0; i < seasons.length; i++) {
        const gamesData = snapshot.val()[seasons[i]]; //all games in a season
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
      }
      setGameHistory(_gameHistory.sort(gameDateCompare));
    });
  }, []);

  return (
    <div>
      <table className="table" style={{ textAlign: "center" }}>
        <thead className="thead-dark">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Earnings</th>
            <th scope="col">Buy Backs</th>
          </tr>
        </thead>
        <tbody>
          {gameHistory.map((player) => {
            return (
              <tr key={player.date}>
                <td>
                  <Link
                    to={`/gamedata/${player.date}`}
                    style={{ color: "black" }}
                  >
                    {formatDate(player.date)}
                  </Link>
                </td>
                <td style={{ color: player.earnings > 0 ? "green" : "red" }}>
                  {player.earnings}
                </td>
                <td>{player.buyBacks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerGameHistory;
