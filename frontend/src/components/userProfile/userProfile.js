import React, { useState, useContext, useEffect } from "react";
import { tokenContext } from "../../App";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Userprofile = () => {
  const { token, setToken, isLoggedIn, setIsloggedin, userInfo, setUserInfo } =
    useContext(tokenContext);
  return <div >
      <div></div>
  </div>;
};

export default Userprofile;
