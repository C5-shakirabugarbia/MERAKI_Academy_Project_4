import React, { useState, useContext, useEffect } from "react";
import { tokenContext } from "../../App";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Categories = () => {
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
  } = useContext(tokenContext);
  const getProduct = () => {
    axios
      .get(`http://localhost:5000/products/category?category=${filterValue}`, {
        headers: { authorization: `Bearer ` + token },
      })
      .then((result) => {
        console.log("aa", result.data.product);
        setProducts(result.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addTocart = (String) => {
    axios
      .put(
        `http://localhost:5000/users/addToCart/${String}`,
        {},
        {
          headers: { authorization: `Bearer ` + token },
        }
      )
      .then((result) => {
        getProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div>
        <button
          onClick={() => {
            navigate("/products");
          }}
        >
          back to all product
        </button>
      </div>
      <div className="productPlace">
        {products.map((element, index) => {
          return (
            <div className="product" key={index}>
              <div className="productimg">
                <img src={element.img}></img>
              </div>
              <div className="productname">
                Product Name: {element.productName}
              </div>
              <div className="productdes">
                Description: {element.description}
              </div>
              <div className="productprice">price:{element.price}$</div>
              <div className="productquantity ">
                items left:{element.quantity}
              </div>
              <div className="productaddcart">
                <button
                  onClick={() => {
                    addTocart(element._id);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
