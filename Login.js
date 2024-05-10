import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../App.css";
import { useAuth } from "../../context/auth";
import backgroundImage from "../../images/9.jpg";





const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };




  //...........................................................................................................................................................

  return (
    <div style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", minHeight: "100vh"}}>
    <Layout title="Login - Fashion Shop">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h4 className="login-title" style={{ fontFamily: "Montserrat" , fontWeight: "bold" }}>LOGIN</h4>

          <div className="form-group">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control login-input"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control login-input"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-link forgot-btn"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="btn btn-primary login-button">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
    </div>
  );
};

export default Login;
