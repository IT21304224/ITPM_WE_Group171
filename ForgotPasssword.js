import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import backgroundImage from "../../images/9.jpg"; 



const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        phone,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", minHeight: "90vh"}}>
      <Layout title={"Forgot Password - Ecommerce APP"}>
        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
          <h4 className="login-title" style={{ fontFamily: "Montserrat", fontWeight: "bold" }}>RESET PASSWORD</h4>


            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control login-input"
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control login-input"
                placeholder="Enter Your phone number"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control login-input"
                placeholder="Enter Your Password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary login-button">
              RESET
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default ForgotPassword;
