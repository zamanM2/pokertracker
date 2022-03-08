import React from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import LandingPage from "./Components/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
