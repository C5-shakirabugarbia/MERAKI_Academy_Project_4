import React from "react";
import { Link } from "react-router-dom";
const FirstNavbar = () => {
  return (
    <div className="firstnav">
      <Link to="/register">register</Link>
      <Link to="/login">login</Link>
    </div>
  );
};

export default FirstNavbar;
