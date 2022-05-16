import axios from "axios";

import React, { useState, useContext, useEffect } from "react";
import { tokenContext } from "../../App";

const Products = () => {
  const [page, setPage] = useState(0);
  const { token, setToken, isLoggedIn, setIsloggedin } =
    useContext(tokenContext);
  const [products, setProducts] = useState([]);
  const next = () => {
    axios
      .get(`http://localhost:5000/products/?p=${page + 1}`, {
        headers: { authorization: `Bearer ` + token },
      })
      .then((result) => {
        console.log(result.data.product);
        if (result.data.product.length !== 0) {
          setProducts(result.data.product);
          setPage(page + 1);
          console.log(page);
        } else {
          setPage(page);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  const back = () => {
    axios
      .get(`http://localhost:5000/products/?p=${page - 1}`, {
        headers: { authorization: `Bearer ` + token },
      })
      .then((result) => {
        console.log(result.data.product);
        setProducts(result.data.product);
        setPage(page - 1);
      })
      .catch((err) => {
        console.log("ag");
        console.log(err);
      });
  };
  const getProduct = () => {
    axios
      .get(`http://localhost:5000/products/`, {
        headers: { authorization: `Bearer ` + token },
      })
      .then((result) => {
        console.log(result.data.product);
        setProducts(result.data.product);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      {products.map((element, index) => {
        return (
          <div className="product" key={index}>
            <div className="productimg">
              <img src={element.img}></img>
            </div>
            <div className="productdes">{element.description}</div>
            <div className="productprice">price:{element.price}$</div>
            <div className="productquantity ">
              items left:{element.quantity}
            </div>
            <div className="productaddcart">Add to cart</div>
          </div>
        );
      })}

      <button
        onClick={(e) => {
          back();
        }}
      >
        back
      </button>
      <button
        onClick={(e) => {
          next();
        }}
      >
        next
      </button>
    </div>
  );
};
export default Products;
