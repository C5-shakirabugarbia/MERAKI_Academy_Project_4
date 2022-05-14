import { Route, Routes } from "react-router-dom";
import "./App.css";
import FirstNavbar from "./components/Navbar/firstNavbar";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import React, { useState, createContext, useEffect } from "react";
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
        <FirstNavbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </tokenContext.Provider>
    </div>
  );
}

export default App;
