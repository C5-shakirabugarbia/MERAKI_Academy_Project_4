import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import logo from "../../set/carrot-logo.jpg";
import { tokenContext } from "../../App";
import axios from "axios";
const SecNav = () => {
  const viewProfile = () => {
    axios
      .get("http://localhost:5000/users/viewProfile", {
        headers: { authorization: `Bearer ` + token },
      })
      .then((result) => {
        console.log(result.data.user);
        setUserInfo(result.data.user);
        setEmail(result.data.user.email);
        setAddress(result.data.user.address);
        setFirstName(result.data.user.firstName);
        setPhoneNumber(result.data.user.phoneNumber);
        setlastName(result.data.user.lastName)
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
    userInfo,
    setUserInfo,
    firstName,
    setFirstName,
    email,
    setEmail,
    address,
    setAddress,
    lastName,
    setlastName,
    phoneNumber,
    setPhoneNumber,
  } = useContext(tokenContext);
  return (
    <div className="firstnav">
      <div className="logo">
        <img src={logo}></img>
        welcome to carrot store
      </div>
      <div className="slinks">
        <div>
          <Link
            onClick={() => {
              viewProfile();
            }}
            to="/myProfile"
          >
            view profile
          </Link>
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
