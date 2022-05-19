import React, { useState, useContext, useEffect } from "react";
import { tokenContext } from "../../App";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const userCart = () => {
    axios
      .get("http://localhost:5000/users/viewcart", {
        headers: { authorization: `Bearer ` + token },
      })
      .then((result) => {
        console.log(result.data.cart);
        setProducts(result.data.cart);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteFromCart = (string) => {
    axios
      .delete(`http://localhost:5000/users/deletefromcart/${string}`, {
        headers: { authorization: `Bearer ` + token },
      })
      .then((result) => {
        console.log(result);
        setTotalItems(totalItems - 1);
        userCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
    totalePrice,
    totalItems,
    setTotalItems,
    setTotalPrice,
  } = useContext(tokenContext);
  let x = 0;
  let y = 0;
  products.forEach((element) => {
    x = x + element.price;
    y = y + 1;
  });
  setTotalPrice(x);
  setTotalItems(y);
  useEffect(() => {
    userCart();
  }, []);

  return (
    <div>
      <button
        className="backcart"
        onClick={() => {
          navigate("/products");
        }}
      >
        back to all products
      </button>
      <div className="productPlace">
        {products.map((element, index) => {
          return (
            <div className="product" key={index}>
              {/* {setTotalPrice(totalePrice + element.price)} */}
              <div className="productimg">
                <img src={element.img}></img>
              </div>
              <div className="productname">
                Product Name: {element.productName}
              </div>

              <div className="productprice">price:{element.price}$</div>

              <div className="productdeletefromcart">
                <button
                  onClick={() => {
                    deleteFromCart(element._id);
                  }}
                >
                  delete from cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="info">
        total price : {totalePrice} total items :{totalItems}
      </div>
    </div>
  );
};

export default Cart;
