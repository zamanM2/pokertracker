import React from "react";
import "./App.css";
import LandingPage from "./Components/LandingPage";
import AddNewGame from "./Components/AddNewGame";
import GameData from "./Components/GameData";
import PlayerProfileData from "./Components/PlayerProfileData";
import Login from "./Components/Login";
import LegalPage from "./Components/LegalPage";
import SeasonStatsPage from "./Components/SeasonStatsPage";
import AuthProvider from "./Context/AuthContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/secret-login" element={<Login />} />
          <Route path="/add-new-game" element={<AddNewGame />} />
          <Route path="/:season/:date" element={<GameData />} />
          <Route path="/profile/:name/:id" element={<PlayerProfileData />} />
          <Route path="/season/stats" element={<SeasonStatsPage />} />
          <Route path="/legal" element={<LegalPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
