import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import FirstNavbar from "./components/Navbar/firstNavbar";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import React, { useState, createContext, useEffect } from "react";
import Categories from "./components/Categories/Categories";
import SecNav from "./components/Navbar/seconedNavbar";
import Products from "./components/products/products";
export const tokenContext = createContext();

function App() {
  const checkToken = localStorage.getItem("token");
  const [token, setToken] = useState(checkToken || "");
  const [isLoggedIn, setIsloggedin] = useState(checkToken ? true : false);
  return (
    <div className="App">
      <tokenContext.Provider
        value={{
          token,
          setToken,
          isLoggedIn,
          setIsloggedin,
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
            path="/products"
            element={isLoggedIn === true ? <Products /> : <></>}
          />
        </Routes>
      </tokenContext.Provider>
    </div>
  );
}

export default App;
