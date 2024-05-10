import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import backgroundImage from "../../images/9.jpg";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <div style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", minHeight: "100vh"}}>
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-4">
              <h2 className="mb-4">User Information</h2>
              <div className="user-info">
                <div className="mb-3">
                  <strong>User Name:</strong> {auth?.user?.name}
                </div>
                <div className="mb-3">
                  <strong>Email:</strong> {auth?.user?.email}
                </div>
                <div className="mb-3">
                  <strong>Phone Number:</strong> {auth?.user?.phone}
                </div>
                <div className="mb-3">
                  <strong>Postal Code:</strong> {auth?.user?.postalCode}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </div>
  );
};

export default Dashboard;
