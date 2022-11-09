import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDate, gameDateCompare } from "../utils/utils";
import { getLatestSeasonNumber } from "../Firebase/PokerApi";

const PlayerGameHistory = (props) => {
  const [gameHistory, setGameHistory] = useState([]);
  const [latestSeason, setLatestSeason] = useState(0);

  useEffect(() => {
    setGameHistory([...props.gameHistory].sort(gameDateCompare));
    getLatestSeasonNumber().then((snapshot) => {
      setLatestSeason(snapshot.val());
    });
  }, [props.gameHistory]);

  return (
    <div>
      {[...Array(latestSeason + 1).keys()].reverse().map((season) => {
        return (
          <>
            <h2 style={{ marginTop: "20px" }}>Season {season}</h2>
            <table className="table" style={{ textAlign: "center" }}>
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Earnings</th>
                  <th scope="col">Buy Backs</th>
                </tr>
              </thead>
              <tbody>
                {gameHistory
                  .filter((game) => game.season === season)
                  .map((player) => {
                    return (
                      <tr key={player.date}>
                        <td>
                          <Link
                            to={`/season-${player.season}/${player.date}`}
                            style={{ color: "black" }}
                          >
                            {formatDate(player.date)}
                          </Link>
                        </td>
                        <td
                          style={{
                            color: player.earnings > 0 ? "green" : "red",
                          }}
                        >
                          {player.earnings}
                        </td>
                        <td>{player.buyBacks}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </>
        );
      })}
    </div>
  );
};

export default PlayerGameHistory;
