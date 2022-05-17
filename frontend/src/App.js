import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import FirstNavbar from "./components/Navbar/firstNavbar";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import React, { useState, createContext, useEffect } from "react";
import Categories from "./components/Categories/Categories";
import SecNav from "./components/Navbar/seconedNavbar";
import Products from "./components/products/products";
import Search from "./components/searchResults/searchResults";
import Userprofile from "./components/userProfile/userProfile";
export const tokenContext = createContext();

function App() {
  const [userInfo, setUserInfo] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const checkToken = localStorage.getItem("token");
  const [token, setToken] = useState(checkToken || "");
  const [isLoggedIn, setIsloggedin] = useState(checkToken ? true : false);
  const [products, setProducts] = useState([]);
  return (
    <div className="App">
      <tokenContext.Provider
        value={{
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
        }}
      >
        {isLoggedIn === false ? <FirstNavbar /> : <SecNav />}
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
        </Routes>
      </tokenContext.Provider>
    </div>
  );
}

export default App;
