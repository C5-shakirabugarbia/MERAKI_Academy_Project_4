import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { tokenContext } from "../../App";

const Categories = () => {
  const getAllCategories = () => {
    axios
      .get("http://localhost:5000/category/", {
        headers: { authorization: `Bearer ` + token },
      })
      .then((result) => {
        console.log(result.data.categories);
        if (result.data.message === "all categories ready to render") {
          setCategories(result.data.categories);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [categories, setCategories] = useState([]);
  const { token, setToken, isLoggedIn, setIsloggedin } =
    useContext(tokenContext);
  useEffect(() => {
    getAllCategories();
  }, []);
  return <div>ag
      <></>
  </div>;
};

export default Categories;
