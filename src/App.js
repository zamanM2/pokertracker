import React from "react";
import "./App.css";
import LandingPage from "./Components/LandingPage";
import AddNewGame from "./Components/AddNewGame";
import GameData from "./Components/GameData";
import PlayerProfileData from "./Components/PlayerProfileData";
import Login from "./Components/Login";
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
          <Route path="/gamedata/:date" element={<GameData />} />
          <Route path="/profile/:name/:id" element={<PlayerProfileData />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
