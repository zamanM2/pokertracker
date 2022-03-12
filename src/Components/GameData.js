import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { getGameData } from "../Firebase/PokerApi";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { IoMdArrowBack } from "react-icons/io";

const GameData = () => {
  const [gameData, setGameData] = useState([]);
  let { date } = useParams();
  const navigate = useNavigate();

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
      <h2 style={{ marginBottom: "5px" }}>
        Date: {date.substr(5).replace("-", "/") + "/" + date.substr(0, 4)}
      </h2>
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
      <Button onClick={() => navigate("/")}>
        <IoMdArrowBack />
      </Button>
    </Container>
  );
};

export default GameData;
