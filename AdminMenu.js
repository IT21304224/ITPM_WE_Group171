import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h4>Admin Panel</h4>
         
          <NavLink
            to="/dashboard/admin/badge-holders"
            className="list-group-item list-group-item-action"
          >
            Badge Holders
          </NavLink>
          <NavLink
            to="/dashboard/admin/feedbacks"
            className="list-group-item list-group-item-action"
          >
            Feedbacks
          </NavLink>
          
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
