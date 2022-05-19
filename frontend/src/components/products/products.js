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
    categories,
    setCategories,
    filterValue,
    setFilterValue,
    totalePrice,
    totalItems,
    setTotalItems,
    setTotalPrice,
  } = useContext(tokenContext);
  const filter = (string) => {
    axios
      .get(`http://localhost:5000/products/category?category=${string}`, {
        headers: { authorization: `Bearer ` + token },
      })
      .then((result) => {
        console.log("aa", result.data.product);
        setProducts(result.data.product);
        setFilterValue(string);
        navigate("/categories");
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
        setProducts(result.data.product);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  useEffect(() => {
    getAllCategories();
    getProduct();
  }, []);

  return (
    <div>
      <div className="search">
        <div className="dropdown">
          <button className="categories">Categories</button>
          <div className="dropdownMenu">
            {categories.map((element, index) => {
              return (
                <div
                  className="catName"
                  key={index}
                  onClick={() => {
                    filter(element._id);
                  }}
                >
                  {element.category}
                </div>
              );
            })}
          </div>
        </div>
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
      </div>
      <button
        className="back"
        onClick={(e) => {
          back();
        }}
      >
        back
      </button>
      <button
        className="next"
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
