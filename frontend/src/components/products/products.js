import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { tokenContext } from "../../App";

const Products = () => {
  const [page, setPage] = useState(0);
  const { token, setToken, isLoggedIn, setIsloggedin } =
    useContext(tokenContext);
  const [products, setProducts] = useState("");
  const next = () => {
    axios
      .get(`http://localhost:5000/products/?p=${page + 1}`, {
        headers: { authorization: `Bearer ` + token },
      })
      .then((result) => {
        console.log(result.data.product);
        if (result.data.message === "all product ready to render") {
          setProducts(result.data.product);
          setPage(page + 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const back = () => {
    axios
      .get(`http://localhost:5000/products/?p=${page - 1}`, {
        headers: { authorization: `Bearer ` + token },
      })
      .then((result) => {
        console.log(result.data.product);
        if (result.data.message === "all product ready to render") {
          setProducts(result.data.product);
          setPage(page - 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getProduct = () => {
    axios
      .get(`http://localhost:5000/products/?p=0`, {
        headers: { authorization: `Bearer ` + token },
      })
      .then((result) => {
        console.log(result.data.product);
        if (result.data.message === "all product ready to render") {
          setProducts(result.data.product);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProduct();
    console.log(page);
  }, []);

  return (
    <div>
      <button
        onClick={(e) => {
          next();
        }}
      >
        next
      </button>
      <button
        onClick={(e) => {
          back();
        }}
      >
        back
      </button>
    </div>
  );
};
export default Products;
