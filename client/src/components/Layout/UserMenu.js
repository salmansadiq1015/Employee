import React from "react";
import { NavLink } from "react-router-dom";

export default function UserMenu() {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h3
            style={{
              marginBottom: "1.5rem",
              textShadow: "-1px 2px 0px orangered",
              fontWeight: "bold",
            }}
          >
            Dashboard
          </h3>

          <NavLink
            to="/dashboard/user"
            className="list-group-item list-group-item-action"
            style={{ background: "orangered" }}
          >
            User Details
          </NavLink>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
}
