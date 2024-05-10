import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons"; // Import Ant Design icons
import axios from "axios";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [pointsBadge, setPointsBadge] = useState(null);

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const response = await axios.get(`/api/v1/auth/user/${auth?.user?._id}`);
        const userPoints = response.data.user.points;

        if (userPoints >= 400 && userPoints < 500) {
          setPointsBadge(<span className="badge bg-warning" color="white">Bronze Member</span>);
        } else if (userPoints >= 500) {
          setPointsBadge(<span className="badge bg-secondary" color="white">Silver Member</span>);
        }
      } catch (error) {
        console.log("Error fetching user points: ", error);
      }
    };

    if (auth?.user?._id) {
      fetchUserPoints();
    }
  }, [auth?.user?._id]);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "#daeaf0" }}>
      <div className="container">
        <Link to="/" className="navbar-brand" style={{ fontFamily: "Montserrat", color: "#363b3b", fontSize: "24px" }}>
          Fashion Elegance
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <div className=" p-1 bg-white" style={{ borderRadius: "40px" }}>
                <SearchInput style={{ borderRadius: "40px" }} />
              </div>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item ml-lg-3">
              <NavLink to="/" className="nav-link" activeClassName="active" style={{ fontFamily: "Roboto Slab", color: "#363b3b" }}>
                Home
              </NavLink>
            </li>
            <li className="nav-item ml-lg-3">
              
            </li>
            <li className="nav-item ml-lg-3">
              <NavLink to="/cart" className="nav-link" activeClassName="active" style={{ fontFamily: "Roboto Slab", color: "#363b3b" }}>
                <Badge count={cart?.length} showZero>
                  <ShoppingCartOutlined style={{ color: "#363b3b", fontSize: "24px" }} />
                </Badge>
              </NavLink>
            </li>
            {!auth?.user ? (
              <>
                <li className="nav-item ml-lg-3">
                  <NavLink to="/register" className="nav-link" activeClassName="active" style={{ fontFamily: "Roboto Slab", color: "#363b3b" }}>
                    Register
                  </NavLink>
                </li>
                <li className="nav-item ml-lg-3">
                  <NavLink to="/login" className="nav-link" activeClassName="active" style={{ fontFamily: "Roboto Slab", color: "#363b3b" }}>
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown ml-lg-3">
                  <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontFamily: "Roboto Slab", color: "#363b3b" }}>
                    {auth?.user?.name}
                  </span>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item" style={{ fontFamily: "Roboto Slab", color: "#000" }}>
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/login" className="dropdown-item" onClick={handleLogout} style={{ fontFamily: "Roboto Slab", color: "#000" }}>
                        Logout
                      </NavLink>
                    </li>
                    <NavLink to="/exchange" className="nav-link" activeClassName="active" style={{ fontFamily: "Roboto Slab", color: "#363b3b" }}>
                      Exchange
                    </NavLink>
                  </ul>
                </li>
              </>
            )}
            
            {pointsBadge && (
              <li className="nav-item ml-lg-3">
                {pointsBadge}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
