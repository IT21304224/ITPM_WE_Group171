import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backgroundImage from "../../images/9.jpg"; 
import "../../App.css"; 





const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        postalCode,
        birthdate,
        username,
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



  //.....................................................................................................................................................................

  return (
    <div style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", minHeight: "90vh"}}>
      <Layout title="Register - Ecommer App">
        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <h4 className="login-title" style={{ fontFamily: "Montserrat", fontWeight: "bold"  }}>REGISTER FORM</h4>

            <div className="form-group">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control login-input"
                placeholder="Enter Your User Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control login-input"
                placeholder="Enter Your Name"
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control login-input"
                placeholder="Enter Your Email "
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
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control login-input"
                placeholder="Enter Your Phone"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control login-input"
                placeholder="Enter Your Address"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="form-control login-input"
                placeholder="Enter Your Postal Code"
                required
              />
            </div>
            <div className="form-group">
              <DatePicker
                id="birthdate"
                selected={birthdate}
                onChange={(date) => setBirthdate(date)}
                className="form-control login-input"
                placeholderText="Select your birthdate"
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={50}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary login-button">
              REGISTER
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Register;
