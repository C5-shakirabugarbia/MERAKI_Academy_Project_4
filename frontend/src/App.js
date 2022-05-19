import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import GoogleLogin from "react-google-login";
import FirstNavbar from "./components/Navbar/firstNavbar";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import React, { useState, createContext, useEffect } from "react";
import Categories from "./components/Categories/Categories";
import SecNav from "./components/Navbar/seconedNavbar";
import Products from "./components/products/products";
import Search from "./components/searchResults/searchResults";
import Userprofile from "./components/userProfile/userProfile";
import Cart from "./components/cart/Cart";
import axios from "axios";
export const tokenContext = createContext();
//  {totalePrice} total items :{totalItems}
function App() {
  const navigate = useNavigate();
  const [totalePrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const checkToken = localStorage.getItem("token");
  const [token, setToken] = useState(checkToken || "");
  const [isLoggedIn, setIsloggedin] = useState(checkToken ? true : false);
  const [products, setProducts] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);

  return (
    <div className="App">
      <tokenContext.Provider
        value={{
          totalePrice,
          totalItems,
          setTotalItems,
          setTotalPrice,
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
        }}
      >
        {isLoggedIn === false ? <FirstNavbar /> : <SecNav />}
        {/* {isLoggedIn === false ? (
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
        )} */}
        <Routes>
          <Route
            path="/register"
            element={isLoggedIn === false ? <Register /> : <></>}
          />
          <Route
            path="/login"
            element={isLoggedIn === false ? <Login /> : <></>}
          />

          <Route
            path="/categories"
            element={isLoggedIn === true ? <Categories /> : <></>}
          />
          <Route
            path="/search"
            element={isLoggedIn === true ? <Search /> : <></>}
          />
          <Route
            path="/products"
            element={isLoggedIn === true ? <Products /> : <></>}
          />
          <Route
            path="/myProfile"
            element={isLoggedIn === true ? <Userprofile /> : <></>}
          />
          <Route
            path="/userCart"
            element={isLoggedIn === true ? <Cart /> : <></>}
          />
        </Routes>
      </tokenContext.Provider>
    </div>
  );
}

export default App;
// 171142303177-dlklu0me533t11g37ll28pjmd603vh8c.apps.googleusercontent.com
