import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  const [isSilverMember, setIsSilverMember] = useState(false);

  // Update quantity state when cart changes
  useEffect(() => {
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item._id] = 1; // Initialize quantity to 1
    });
    setQuantities(initialQuantities);
  }, [cart]);

  // Check if the user is a silver member
  useEffect(() => {
    setIsSilverMember(auth?.user?.isSilverMember);
  }, [auth?.user?.isSilverMember]);

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  // Update quantity and recalculate total when "Update Quantity" button is clicked
  const updateQuantity = (productId) => {
    // Perform any validation or checks here if needed
    // For example, make sure the quantity is greater than 0
    const updatedQuantity = quantities[productId];
    // Update the quantity in the state
    // Recalculate the total price
  };




  // Calculate total price with discount for silver members
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        const itemTotal = item.price * quantities[item._id];
        total += itemTotal;
      });

      // Check if the user is a silver member
      if (isSilverMember) {
        // Apply 20% discount for silver members
        total *= 0.8; // 20% discount
      }

      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "LKR",
      });
    } catch (error) {
      console.log(error);
    }
  };





  // Delete item from cart
  const removeCartItem = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getToken();
  }, [auth?.token]);




  // Handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });

      // Calculate points based on total price divided by 10
      let pointsEarned = 0;
      const numericTotalPrice = parseFloat(
        totalPrice().replace(/[^\d.-]/g, "")
      ); // Remove non-numeric characters
      if (numericTotalPrice > 0) {
        pointsEarned = Math.floor(numericTotalPrice / 100);
      }

      // Update user's points in the backend
      const updatedUser = await axios.post("/api/v1/auth/updatePoints", {
        userId: auth.user._id,
        points: pointsEarned,
      });

      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };




  //.....................................................................................................................................................................

  return (
    <Layout>
      <div className="cart-page">
       
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello ${auth?.user?.name}`}
            </h1>
            <p className="text-center">
              {cart?.length
                ? `You have ${cart.length} items in your cart. ${
                    auth?.token ? "" : "Please login to checkout!"
                  }`
                : "Your cart is empty"}
            </p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-7 p-0 m-0">
              {cart?.map((p) => (
                <div
                  className="row card flex-row mb-3"
                  key={p._id}
                >
                  <div className="col-md-2">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.productname}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{p.productname}</h5>
                      
                      <p className="card-text">Price: {p.price}</p>
                      <label>Quantity:</label>
                      <input
                        type="number"
                        value={quantities[p._id]}
                        onChange={(e) =>
                          handleQuantityChange(
                            p._id,
                            parseInt(e.target.value, 10)
                          )
                        }
                        min="1"
                        className="form-control mb-2"
                      />
                      <button
                        className="btn btn-primary btn-sm mr-2"
                        onClick={() => updateQuantity(p._id)}
                      >
                        Update Quantity
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5">
              <div className="cart-summary">
                <h2>Cart Summary</h2>
                <hr />
                <h4>Total: {totalPrice()} </h4>
                <div>
                  {!clientToken || !auth?.token || !cart?.length ? (
                    ""
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />

                      <button
                        className="btn btn-primary btn-block mt-3"
                        onClick={handlePayment}
                        disabled={loading || !instance}
                      >
                        {loading ? "Processing ..." : "Make Payment"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
