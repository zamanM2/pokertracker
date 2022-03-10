import React from "react";
import "./App.css";
import LandingPage from "./Components/LandingPage";
import AddNewGame from "./Components/AddNewGame";
import Login from "./Components/Login";
import AuthProvider from "./Context/AuthContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="add-new-game" element={<AddNewGame />} />
          <Route path="secret-login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
