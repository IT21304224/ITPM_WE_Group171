import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import CustomerList from "./../../components/customerList"; 


//...........................................................................................................................

const Users = () => {
  return (
    
      <Layout title={"All Users"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <CustomerList />
            </div>
          </div>
        </div>
      </Layout>
    
  );
};

export default Users;
