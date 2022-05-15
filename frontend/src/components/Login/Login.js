import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tokenContext } from "../../App";
import "./login.css";
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken, isLoggedIn, setIsloggedin } =
    useContext(tokenContext);
  const [message, setMessage] = useState("");
  const login = () => {
    axios
      .post("http://localhost:5000/login/", {
        email,
        password,
      })
      .then((result) => {
        localStorage.setItem("token", result.data.token);
        setToken(result.data.token);
        setIsloggedin(true);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };
  return (
    <div className="login">
      <div className=" loginInputs">
        <label>email</label>
        <input
          type="email"
          placeholder="enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <label>password</label>
        <input
          type="password"
          placeholder="enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </div>
      <div className="loginButton">
        <button
          onClick={(e) => {
            login();
            navigate("/products");
          }}
        >
          login
        </button>
      </div>
    </div>
  );
};
export default Login;
