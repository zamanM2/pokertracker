import React from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login().then(() => {
      navigate("/");
    });
  };

  return (
    <div className="navbar">
      <button className="googleButton" onClick={handleLogin}>
        <FcGoogle />
      </button>
    </div>
  );
};

export default Login;
