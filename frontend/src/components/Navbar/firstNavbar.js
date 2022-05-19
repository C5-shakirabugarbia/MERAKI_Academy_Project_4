import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import logo from "../../set/carrot-logo.jpg";
const FirstNavbar = () => {
  return (
    <div className="firstnav">
      <div className="logo">{<img  className="thelogo" src={logo}></img>}</div>
      <div className="links">
        <p> welcome to carrot store</p>

        <div>
          <Link to="/register">register</Link>
        </div>
        <div>
          <Link onClick={() => {}} to="/login">
            login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FirstNavbar;
