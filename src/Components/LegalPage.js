import React from "react";
import Button from "react-bootstrap/Button";
import { IoMdArrowBack } from "react-icons/io";
import Container from "react-bootstrap/Container";
import "../css/blackBtn.css";
import { useNavigate } from "react-router-dom";

const LegalPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      className="parentContainer"
      style={{ fontFamily: "Comic Sans MS" }}
    >
      <Button
        className="blackBtn"
        style={{ marginTop: "5px" }}
        onClick={() => navigate("/")}
      >
        <IoMdArrowBack />
      </Button>
      <h1 style={{ textAlign: "center" }}>
        <i>Legal Terms</i>
      </h1>
      <h2>[A]rgoBros&copy; Seasons</h2>
      <p>
        Welcome to [A]rgoBros&copy; Seasons. Each season has 12 games. At the
        end of the season, winners are determined by the number of points
        earned.
      </p>
      <h2>Point System</h2>
      <ul style={{ listStyleType: "square" }}>
        <li>
          Most Season earnings
          <ul style={{ listStyleType: "square" }}>
            <li>(1st) +3 points</li>
            <li>(2nd) +2 points</li>
            <li>(3rd) +1 points</li>
          </ul>
        </li>
        <li>Most money in one game session +2 points</li>
        <li>Longest win streak +1 point</li>
        <li>Best +/- ratio (%) +1 point</li>
      </ul>
      <div>
        ** In case of a tie, the person with the most overall season earnings is
        the winner
      </div>
      <br />
      <h2>Game Fees</h2>
      <p>
        At the start of the Season, each player will donate $5 to the prize
        pool. At the end of each game, each player will donate $1 to the prize
        pool.
      </p>
      <h2>Bank Rules</h2>
      <p>
        Sakib will be bank every night. When sending and requesting money on
        Venmo/Zelle, he'll add or subtract $1 from each player (depending on if
        you owe or are owed $). This money will be added to the prize pool.
      </p>
      <h2>Prizes for the Season</h2>
      <ul style={{ listStyleType: "square" }}>
        <li>First Place: 50% of Prize pool and a 1st Place trophy</li>
        <li>Second Place: 30% of Prize pool</li>
        <li>Third Place: 20% of Prize pool</li>
      </ul>
      <div>
        ** A minimum of 8 games have to be played to be considered for prizes
      </div>
    </Container>
  );
};

export default LegalPage;
