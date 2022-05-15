import React, { useState } from "react";
import axios from "axios";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [massage, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const role = "627a43ac49a1e22dc69e84cb";
  const register = () => {
    axios
      .post("http://localhost:5000/users/", {
        email,
        password,
        firstName,
        lastName,
        role,
        phoneNumber,
        address,
      })
      .then((result) => {
        navigate("/login");
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };
  return (
    <div className="register">
      <div className="regsInputs">
        <label>first name</label>
        <input
          type="text"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          placeholder="enter your first Name"
        ></input>
        <label>last name</label>
        <input
          type="text"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          placeholder="enter your last Name"
        ></input>
        <label>phone number</label>
        <input
          type="number"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          placeholder="phone number"
        ></input>
        <label>address</label>
        <input
          type="text"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          placeholder="address"
        ></input>
        <label>email</label>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="email"
        ></input>
        <label>password</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        ></input>
      </div>
      <div className="regsButton">
        <button
          className="signUpButton"
          onClick={(e) => {
            register();
          }}
        >
          register
        </button>
      </div>
      <div className="regMessage">{massage}</div>
    </div>
  );
};

export default Register;
