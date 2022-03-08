import React from "react";
import "./App.css";
import EarningsGraph from "./Components/EarningsGraph";
import Container from "react-bootstrap/Container";
import UserList from "./Components/UserList";

function App() {
  return (
    <Container>
      <EarningsGraph />
      <UserList />
    </Container>
  );
}

export default App;
