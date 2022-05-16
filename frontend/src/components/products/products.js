import axios from "axios";
import "./product.css";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tokenContext } from "../../App";

const Products = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const {
    token,
    setToken,
    isLoggedIn,
    setIsloggedin,
    products,
    setProducts,
    searchValue,
    setSearchValue,
  } = useContext(tokenContext);

  const search = (String) => {
    axios
      .get(`http://localhost:5000/products/search?productName=${String}`, {
        headers: { authorization: `Bearer ` + token },
      })
      .then((result) => {
        console.log(result.data.product);
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
      .get(`http://localhost:5000/products/?p=${page}`, {
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
      <div>
        <button
          onClick={(e) => {
            search(searchValue);
            navigate("/search");
          }}
        >
          search
        </button>
        <input
          type="text"
          placeholder="search"
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
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
    </div>
  );
};
export default Products;
