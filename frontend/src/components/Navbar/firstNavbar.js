import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import logo from "../../set/carrot-logo.jpg";
const FirstNavbar = () => {
  return (
    <div className="firstnav">
      <div className="logo">
        <img src={logo}></img>
        welcome to carrot store
      </div>
      <div className="links">
        <div>
          <Link to="/register">register</Link>
        </div>
        <div>
          <Link to="/login">login</Link>
        </div>
      </div>
    </div>
  );
};

export default FirstNavbar;
