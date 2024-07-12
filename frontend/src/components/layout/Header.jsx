import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth/Auth";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [Dropdown, setDropdown] = useState(false);
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleDropdown = () => {
    setDropdown(!Dropdown);
  };

  return (
    <nav>
      <div className="flex flex-col md:flex-row justify-evenly flex-wrap items-center font-semibold text-lg md:text-xl bg-black h-14 text-white md:px-4">
        <p className="text-center md:text-left">
          Free shipping, 30-day return or refund guarantee.
        </p>
      </div>
      <header className="flex items-center justify-between h-16 px-4 md:px-20 bg-white shadow-md">
        <div className="text-xl"><Link to={'/'}>MEN WEARS</Link></div>
        <div className="hidden md:flex items-center space-x-4">
          <NavLink to="/" className="hover:text-orange-300">
            Home
          </NavLink>
          <NavLink to="/category" className="hover:text-orange-300">
            Category
          </NavLink>
          <NavLink to="/blog" className="hover:text-orange-300">
            Blog
          </NavLink>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {!auth.user ? (
            <>
              <NavLink to="/login" className="hover:text-orange-300">
                Login
              </NavLink>
              <NavLink to="/register" className="hover:text-orange-300">
                Register
              </NavLink>
            </>
          ) : (
            <div className="">
              <div
                className="flex items-center cursor-pointer"
                onClick={handleDropdown}
              >
                 <div className="bg-gray-800 rounded-full p-1">
                  <FaUser className="text-white " />
                </div>
                {Dropdown ? (
                  <MdExpandLess className="h-5 w-5 text-gray-800" />
                ) : (
                  <MdExpandMore className="h-5 w-5 text-gray-800" />
                )}
              </div>
              {Dropdown && (
                <div className="absolute mt-2 w-40 bg-white rounded-md shadow-lg">
                  <NavLink
                    to={`/dashboard/${auth.user.role ===1 ?'admin' :'user'}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    onClick={handleLogout}
                    to="/login"
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Logout
                  </NavLink>
                </div>
              )}
            </div>
          )}
          <div className="flex items-center">
            <NavLink to="/cart" className="hover:text-orange-300">
              Cart(0)
            </NavLink>
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-black focus:outline-none"
          ></button>
        </div>
      </header>
      {isMobileMenuOpen && <div></div>}
    </nav>
  );
};

export default Header;
