import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import backgroundImage from "../../images/9.jpg";



const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [birthdate, setBirthdate] = useState("");



  //get user data
  useEffect(() => {
    const { email, name, phone, address, postalCode, birthdate } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
    setPostalCode(postalCode);
    // Parse and format birthdate
    if (birthdate) {
      const formattedBirthdate = new Date(birthdate).toLocaleDateString();
      setBirthdate(formattedBirthdate);
    }
  }, [auth?.user]);



//.............................................................................................................................................
  

// form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
        postalCode,
        birthdate,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover"
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            width: "400px"
          }}
        >
          <form onSubmit={handleSubmit}>
            <h4 style={{ textAlign: "center", marginBottom: "20px" }}>USER PROFILE</h4>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box" }}
                placeholder="Enter Your Name"
                autoFocus
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box" }}
                placeholder="Enter Your Email"
                disabled
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box" }}
                placeholder="Enter Your Password with 6 characters"
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box" }}
                placeholder="Enter Your Phone"
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box" }}
                placeholder="Enter Your Address"
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box" }}
                placeholder="Enter Your postal code"
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <input
                type="text"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box" }}
                placeholder="Enter Your birthday (YYYY-MM-DD)"
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#007bff",
                color: "#fff",
                cursor: "pointer",
                transition: "background-color 0.3s"
              }}
            >
              UPDATE
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
