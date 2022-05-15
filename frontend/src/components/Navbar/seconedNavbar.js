import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import logo from "../../set/carrot-logo.jpg";
import { tokenContext } from "../../App";
const SecNav = () => {
  const { token, setToken, isLoggedIn, setIsloggedin } =
    useContext(tokenContext);
  return (
    <div className="firstnav">
      <div className="logo">
        <img src={logo}></img>
        welcome to carrot store
      </div>
      <div className="slinks">
        <div>
          <Link to="/register">view profile</Link>
        </div>
        <div>
          <Link
            onClick={() => {
              setIsloggedin(false);
              localStorage.removeItem("token");
            }}
            to="/login"
          >
            logout
          </Link>
        </div>
        <div>
          <Link to="/login"> view cart</Link>
        </div>
      </div>
    </div>
  );
};

export default SecNav;
