import React from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Container from "react-bootstrap/Container";

const Login = () => {
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/");
  };

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  return (
    <Container>
      <button onClick={handleLogin}>
        <FcGoogle />
      </button>
      <button onClick={handleSignOut}>LOGOUT</button>
    </Container>
  );
};

export default Login;
