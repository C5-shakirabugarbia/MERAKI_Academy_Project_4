import React, { useState, useContext } from "react";
import axios from "axios";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { tokenContext } from "../../App";
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
  const {
    token,
    setToken,
    isLoggedIn,
    setIsloggedin,
    products,
    setProducts,
    searchValue,
    setSearchValue,
    categories,
    setCategories,
    filterValue,
    setFilterValue,
  } = useContext(tokenContext);
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
  const responseGoogle = (googleData) => {
    console.log(password);
    console.log(googleData.tokenObj.id_token);
    localStorage.setItem("token", googleData.tokenObj.id_token);
    // setEmail(googleData.profileObj.email);
    // console.log("email response google", googleData.profileObj.email);
    // setAddress("none");
    // setFirstName(googleData.profileObj.givenName);
    // setPassword("none");
    // setPhoneNumber(0);
    // setlastName(googleData.profileObj.familyName);
    registerr(googleData);
    // setToken(googleData.id_token);
    navigate("/login");
  };
  const registerr = (googleData) => {
    console.log("token", token);
    axios
      .post("http://localhost:5000/users/", {
        email: googleData.profileObj.email,
        password: "123456",
        firstName: googleData.profileObj.givenName,
        lastName: googleData.profileObj.familyName,
        role,
        phoneNumber: 85558,
        address: "address",
      })
      .then((result) => {})
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
      {isLoggedIn === false ? (
        <GoogleLogin
          clientId="171142303177-dlklu0me533t11g37ll28pjmd603vh8c.apps.googleusercontent.com"
          buttonText="register with google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      ) : (
        <></>
      )}
      {isLoggedIn === false ? (
        <input
          placeholder="set youer password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Register;
