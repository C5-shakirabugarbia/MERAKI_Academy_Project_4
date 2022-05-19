import React, { useState, useContext, useEffect } from "react";
import { tokenContext } from "../../App";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./userprofile.css";

const Userprofile = () => {
  const [updating, setupdate] = useState(false);

  const navigate = useNavigate();
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
  const confirming = () => {
    axios
      .put(
        "http://localhost:5000/users/update",
        { firstName, lastName, email, address, phoneNumber },
        {
          headers: { authorization: `Bearer ` + token },
        }
      )
      .then((result) => {
        setUserInfo(result.data.user);
        viewProfile();
      })
      .catch((err) => {
        console.log(err);
      });
    setupdate(false);
  };
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
        setlastName(result.data.user.lastName);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    viewProfile();
  }, []);
  return (
    <div>
      <div className="Userback">
        <button
          className="UserbackB"
          onClick={() => {
            navigate("/products");
          }}
        >
          back to view all products
        </button>
      </div>

      {userInfo.map((element, index) => {
        return (
          <div key={index} className="userProfile">
            <div className="firstName">
              first name : {element.firstName}
              {updating === true ? (
                <input
                  defaultValue={element.firstName}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setFirstName(e.target.defaultValue);
                    } else {
                      setFirstName(e.target.value);
                    }
                  }}
                  placeholder="update first name"
                ></input>
              ) : (
                <></>
              )}
            </div>
            <div className="lastName">
              last name : {element.lastName}
              {updating === true ? (
                <input
                  defaultValue={element.lastName}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setlastName(e.target.defaultValue);
                    } else {
                      setlastName(e.target.value);
                    }
                  }}
                  placeholder="update last Name"
                ></input>
              ) : (
                <></>
              )}
            </div>
            <div className="phoneNumber">
              phone number : {element.phoneNumber}
              {updating === true ? (
                <input
                  defaultValue={element.phoneNumber}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setPhoneNumber(e.target.defaultValue);
                    } else {
                      setPhoneNumber(e.target.value);
                    }
                  }}
                  placeholder="update phone number"
                ></input>
              ) : (
                <></>
              )}
            </div>
            <div className="email">
              email : {element.email}
              {updating === true ? (
                <input
                  defaultValue={element.email}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setEmail(e.target.defaultValue);
                    } else {
                      setEmail(e.target.value);
                    }
                  }}
                  placeholder="update email"
                ></input>
              ) : (
                <></>
              )}
            </div>
            <div className="address">
              address: {element.address}
              {updating === true ? (
                <input
                  defaultValue={element.address}
                  onChange={(e) => {
                    if (e.target.value === "") {
                      setAddress(e.target.defaultValue);
                    } else {
                      setAddress(e.target.value);
                    }
                  }}
                  placeholder="update address"
                ></input>
              ) : (
                <></>
              )}
            </div>
          </div>
        );
      })}
      <button className="update"
        onClick={(e) => {
          setupdate(true);
        }}
      >
        update
      </button>
      <button
        className="cancle"
        onClick={(e) => {
          setupdate(false);
        }}
      >
        cancle
      </button>
      <button
        className="confirming"
        onClick={(e) => {
          confirming();
        }}
      >
        confirme
      </button>
    </div>
  );
};

export default Userprofile;
