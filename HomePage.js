import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";
import HeroSection from "../components/Hero/HeroSection";
import { Footer } from "antd/es/layout/layout";
import FeedbackForm from "../components/FeedbackForm";




const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  



  


  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  




  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts((prevProducts) => [...prevProducts, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  





  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };


  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };




  const handleFilter = (value, id) => {
    setChecked((prevChecked) => {
      if (value) {
        return [...prevChecked, id];
      } else {
        return prevChecked.filter((c) => c !== id);
      }
    });
  };






  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getAllCategory();
    getAllProducts();
    getTotal();
  }, []);


  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    else getAllProducts();
  }, [checked, radio]);





  //..................................................................................................................................................................................




  return (
    <Layout title={"All Products - Best offers "}>

      <HeroSection/>
      
      <div className="container-fluid row mt-3 home-page">
      <div className="col-md-3 filters">
  <div className="d-flex flex-column">
    {categories?.map((c) => (
      <Checkbox
        key={c._id}
        onChange={(e) => handleFilter(e.target.checked, c._id)}
      >
        {c.name}
      </Checkbox>
    ))}
  </div>
  <div className="mt-4 text-center">
    <h4 className="mb-3">Filter By Price</h4>
    <div className="d-flex flex-column price-filter">
      <Radio.Group onChange={(e) => setRadio(e.target.value)}>
        {Prices?.map((p) => (
          <div key={p._id}>
            <Radio value={p.array}>
              <strong>{p.name}</strong> {/* Make text bold */}
            </Radio>
          </div>
        ))}
      </Radio.Group>
    </div>
  </div>
  <div className="d-flex flex-column mt-3">
    <button
      className="btn btn-danger"
      onClick={() => window.location.reload()}
    >
      RESET FILTERS
    </button>
  </div>
  <br/>
  <br/>
  <br/>
  <br/>
  
</div>
        <div className="col-md-9 ">
          
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id}>
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
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={loadMore}
                disabled={loading}
              >
                {loading ? "Loading ..." : "Load More"}
                <AiOutlineReload />
              </button>
            )}
          </div>
          <div>
          
          </div>
        </div>
      </div>
      <Footer/>
    </Layout>
    
  );
};

export default HomePage;
