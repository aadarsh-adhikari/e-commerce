import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="sticky top-32 bg-gray-800 text-white w-64 h-full flex flex-col">
      <div className="p-4">
        <h2 className="text-xl font-bold">Admin Menu</h2>
      </div>
      <nav className="flex-1">
        <NavLink
          to="/dashboard/admin/category"
          className="block py-2 px-4 text-sm hover:bg-gray-700"
        >
          Manage Categories
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="block py-2 px-4 text-sm hover:bg-gray-700"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/product"
          className="block py-2 px-4 text-sm hover:bg-gray-700"
        >
        Manage Products
        </NavLink>
     
      </nav>
    </div>
  );
};

export default AdminMenu;
