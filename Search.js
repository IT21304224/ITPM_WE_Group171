import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();


//......................................................................................................................................


  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-1" key={p._id} style={{ width: "200px" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.productname}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.productname}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "LKR",
                      })}
                    </h5>
                  </div>
                  <div className="card-buttons">
                    <button
                      className="btn btn-info"
                      style={{ backgroundColor: "#000", borderColor: "#000" }}
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      <span style={{ color: "#fff" }}>More Details</span>
                    </button>
                    <button
                      className="btn btn-dark mt-2"
                      style={{ backgroundColor: "#ff0000", borderColor: "#ff0000" }}
                      onClick={() => {
                        setCart((prevCart) => [...prevCart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to Cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
