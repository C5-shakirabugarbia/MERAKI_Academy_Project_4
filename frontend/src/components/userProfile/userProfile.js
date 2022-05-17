import React, { useState, useContext, useEffect } from "react";
import { tokenContext } from "../../App";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Userprofile = () => {
  const navigate = useNavigate();
  const { token, setToken, isLoggedIn, setIsloggedin, userInfo, setUserInfo } =
    useContext(tokenContext);
  return (
    <div>
      <button
        onClick={() => {
          navigate("/products");
        }}
      >
        back to view all products
      </button>
      {userInfo.map((element, index) => {
        return (
          <div key={index} className="userProfile">
            <div className="firstName">first name : {element.firstName}</div>
            <div className="lastName">last name : {element.lastName}</div>
            <div className="phoneNumber">
              phone number : {element.phoneNumber}
            </div>
            <div className="email"> email : {element.email}</div>
            <div className="address">address: {element.address}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Userprofile;
