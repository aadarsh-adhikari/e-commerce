import React from 'react'
import { NavLink } from 'react-router-dom'

const Usermenu = () => {
  return (
    <div className="bg-gray-800 text-white w-64 flex flex-col">
    <div className="p-4">
      <h2 className="text-xl font-bold">user Menu</h2>
    </div>
    <nav className="flex-1">
      <NavLink
        to="/dashboard/user/profile"
        className="block py-2 px-4 text-sm hover:bg-gray-700"
      >
        Profile
      </NavLink>
      <NavLink
        to="/cart"
        className="block py-2 px-4 text-sm hover:bg-gray-700"
      >
        Orders
      </NavLink>
    
    </nav>
  </div>
  )
}

export default Usermenu
