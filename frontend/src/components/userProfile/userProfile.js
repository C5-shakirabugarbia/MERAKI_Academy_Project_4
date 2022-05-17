import React, { useState, useContext, useEffect } from "react";
import { tokenContext } from "../../App";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Userprofile = () => {
  const [updating, setupdate] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhoneNumber] = useState(0);
  const navigate = useNavigate();
  const { token, setToken, isLoggedIn, setIsloggedin, userInfo, setUserInfo } =
    useContext(tokenContext);
  const confirming = () => {
    axios
      .put(
        "http://localhost:5000/users/update",
        { firstName, lastName, email, address, phonenumber },
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
  };
  const viewProfile = () => {
    axios
      .get("http://localhost:5000/users/viewProfile", {
        headers: { authorization: `Bearer ` + token },
      })
      .then((result) => {
        console.log(result.data.user);
        setUserInfo(result.data.user);
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
            <div className="firstName">
              first name : {element.firstName}
              {updating === true ? (
                <input
                  onChange={(e) => {
                    setFirstName(e.target.value);
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
                  onChange={(e) => {
                    setlastName(e.target.value);
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
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
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
                  onChange={(e) => {
                    setEmail(e.target.value);
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
                  onChange={(e) => {
                    setAddress(e.target.value);
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
      <button
        onClick={(e) => {
          setupdate(true);
        }}
      >
        update
      </button>
      <button
        onClick={(e) => {
          setupdate(false);
        }}
      >
        cancle
      </button>
      <button
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
