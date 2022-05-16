import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { tokenContext } from "../../App";

const Categories = () => {
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
  } = useContext(tokenContext);
  return (
    <div>
      ag
      <></>
    </div>
  );
};

export default Categories;
