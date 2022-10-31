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
      <h2>Game Fees</h2>
      <p>
        At the start of the Season, each player will donate $5 to the prize
        pool. At the end of each game, each player will donate $1 to the prize
        pool.
      </p>

      <h2>Point System</h2>
      <p>
        - Most money overall (1st) +3 points, (2nd) +2 points, (3rd) +1 point
      </p>
      <p>- Most money in one game session +2 points</p>
      <p>- Longest green streak +1 point</p>
      <p>- Best +/- ratio +1 point</p>
      <p>
        ** In case of a tie, the person with the most overall season earnings is
        the winner
      </p>
      <h2>Prizes for Season 1</h2>
      <p>First Place: 50% of Prize pool and a 1st Place trophy</p>
      <p>Second Place: 30% of Prize pool</p>
      <p>Third Place: 20% of Prize pool</p>
    </Container>
  );
};

export default LegalPage;
