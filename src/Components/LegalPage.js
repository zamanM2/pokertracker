import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { IoMdArrowBack } from "react-icons/io";
import Container from "react-bootstrap/Container";
import "../css/blackBtn.css";
import { useNavigate } from "react-router-dom";

const LegalPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container
      className="parentContainer"
      style={{ fontFamily: "Arial, sans-serif" }}
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
        earned. You agree to the following rules , no exceptions are given:
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
        <li>Every All-in you win at showdown gives you +0.10 points</li>
      </ul>
      <div>
        ** In case of a tie at the end of the season, the person with the most
        overall season earnings is the winner
      </div>
      <br />
      <h2>Prizes for the Season</h2>
      <ul style={{ listStyleType: "square" }}>
        <li>
          First Place: 60% of Prize pool, a 1st Place trophy, and a Peloton
          Tumbler bottle
        </li>
        <li>Second Place: 30% of Prize pool</li>
        <li>Third Place: 10% of Prize pool</li>
      </ul>
      <div>
        ** A minimum of 8 games have to be played to be considered for prizes
      </div>
      <br />
      <h2>Game Fees</h2>
      <p>
        At the start of the Season, each player will donate $5 to the prize
        pool. At the end of each game, each player will donate $1 to the prize
        pool.
      </p>
      <h2>Bank/Dealer Rules</h2>
      <p>
        Sakib will be bank every night. When sending and requesting money on
        Venmo/Zelle, he'll add or subtract $2 from each player (depending on if
        you owe or are owed $). Half this money will be added to the prize pool,
        the other half will be added to the dealer fee.
      </p>
      <h2>Pineapple Rules</h2>
      <p>
        Pineapple can only be played with a $1 starting bet. Max bet is $2 and
        each re-raise is 2x the current bet.
      </p>
      <label style={{ fontSize: 14 }}>
        &copy; [A]rgoBros 2022-2023, All rights reserved.
      </label>
    </Container>
  );
};

export default LegalPage;
