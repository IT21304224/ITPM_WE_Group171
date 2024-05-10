import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";





const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});

  // Fetch product details on component mount
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Fetch product details from API
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  // Add product to cart
  const addToCart = () => {
    setCart((prevCart) => [...prevCart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item added to cart");
  };


//.....................................................................................................................................................................


  return (
    <Layout>
      <ProductContainer>
        <div className="row">
          <div className="col-md-6">
            <ProductImage
              src={`/api/v1/product/product-photo/${product._id}`}
              alt={product.productname}
            />
          </div>
          <div className="col-md-6">
            <ProductInfo>
              <ProductName>{product.productname}</ProductName>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductDetailsList>
                <ProductDetailItem>
                  <strong>Price:</strong>{" "}
                  {product?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "LKR",
                  })}
                </ProductDetailItem>
              </ProductDetailsList>
              <AddToCartButton onClick={addToCart}>
                Add to Cart
              </AddToCartButton>
            </ProductInfo>
          </div>
        </div>
      </ProductContainer>
    </Layout>
  );
};

export default ProductDetails;

const ProductContainer = styled.div`
  margin-top: 20px;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProductInfo = styled.div`
  padding: 20px;
`;

const ProductName = styled.h2`
  font-size: 32px; /* Increased font size */
  margin-bottom: 10px;
  font-weight: bold; /* Special styling */
`;

const ProductDescription = styled.p`
  font-size: 18px; /* Increased font size */
  margin-bottom: 20px;
`;

const ProductDetailsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
`;

const ProductDetailItem = styled.li`
  font-size: 20px; /* Increased font size */
  margin-bottom: 10px;
`;

const AddToCartButton = styled.button`
  background-color: #343a40;
  color: #fff;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 8px;
  &:hover {
    background-color: #23272b;
  }
`;
