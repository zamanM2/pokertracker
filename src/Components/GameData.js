import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { getGameData } from "../Firebase/PokerApi";
import { useParams } from "react-router-dom";

const GameData = () => {
  const [gameData, setGameData] = useState([]);
  let { date } = useParams();

  useEffect(() => {
    getGameData(date).then((snapshot) => {
      const keys = Object.keys(snapshot.val());
      const _gameData = [];
      for (const key of keys) {
        _gameData.push({ ...snapshot.val()[key] });
      }
      setGameData(_gameData);
    });
  }, []);

  return (
    <Container>
      <table className="table" style={{ textAlign: "center" }}>
        <thead className="thead-dark">
          <tr>
            <th scope="col">Player</th>
            <th scope="col">Earnings</th>
            <th scope="col">Buy Backs</th>
          </tr>
        </thead>
        <tbody>
          {gameData.map((player) => {
            return (
              <tr key={player.name}>
                <td>{player.name}</td>
                <td>{player.earnings}</td>
                <td>{player.buyBacks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
};

export default GameData;
