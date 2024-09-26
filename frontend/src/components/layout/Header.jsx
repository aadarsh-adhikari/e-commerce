import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdExpandLess, MdExpandMore, MdMenuOpen, MdSearch, MdShoppingCart } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth/Auth";
import { Badge } from "antd";
import { useCart } from "../auth/Cart";

const Header = () => {
  const [cart, setCart] = useCart();
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
    setCart(null);
    localStorage.removeItem("cart");
  };

  const handleSearch = () => {
    const input = document.querySelector('input[type="text"]');
    const keyword = input.value.trim();
    
    if (keyword) {
      window.location.href = `/product/search?keyword=${encodeURIComponent(keyword)}`;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdown = () => {
    setDropdown(!Dropdown);
  };

  return (
    <nav className="sticky top-0 z-10">
      <div className="flex flex-col md:flex-row justify-evenly flex-wrap items-center font-semibold text-lg md:text-xl bg-black h-14 text-white md:px-4">
        <p className="text-center md:text-left">
          Free shipping, 30-day return or refund guarantee.
        </p>
      </div>
      <header className="flex items-center justify-between h-16 px-4 md:px-20 bg-white shadow-md">
      <div className="text-2xl font-bold bg-gradient-to-r from-red-400 to-blue-500 bg-clip-text text-transparent hover:underline transition duration-300">
    <Link to='/'>
        READ NEPAL
    </Link>
</div>
        <div className="hidden md:flex items-center space-x-4">
          <NavLink to="/" className="hover:text-orange-300">Home</NavLink>
          <NavLink to="/category" className="hover:text-orange-300">Category</NavLink>
          <NavLink to="/blog" className="hover:text-orange-300">Blog</NavLink>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex flex-row items-center gap-2 relative">
            <input
              type="text"
              className="w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Search products..."
              style={{ transition: 'width 0.3s ease' }}
            />
            <button
              type="button"
              className="absolute right-0 rounded p-1 hover:bg-slate-200 transition-all delay-75 ease-in-out"
              onClick={handleSearch}
            >
              <MdSearch className="h-7 w-7 text-gray-800" />
            </button>
          </div>
          {!auth.user ? (
            <>
              <NavLink to="/login" className="hover:text-orange-300">Login</NavLink>
              <NavLink to="/register" className="hover:text-orange-300">Register</NavLink>
            </>
          ) : (
            <div className="relative">
              <div className="flex items-center cursor-pointer" onClick={handleDropdown}>
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
                    to={`/dashboard/${auth.user.role === 1 ? 'admin' : 'user'}`}
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
          <div className="">
            <Badge count={cart?.length} showZero>
              <NavLink to="/cart" className="text-3xl">
                <MdShoppingCart className="pt-2"/>
              </NavLink>
            </Badge>
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-black focus:outline-none text-2xl"
          >
            {isMobileMenuOpen ? 'X' : <MdMenuOpen/>} {/* Button text for mobile */}
          </button>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div className="flex flex-col md:hidden bg-white shadow-md">
          <NavLink to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</NavLink>
          <NavLink to="/category" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Category</NavLink>
          <NavLink to="/blog" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Blog</NavLink>
          <div className="flex flex-col items-start space-y-2 px-2 py-2">
            <div className="flex items-center gap-2 w-full">
              <input
                type="text"
                className=" px-2 py-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Search"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="text-gray-800 "
              >
                <MdSearch />
              </button>
            </div>
            {!auth.user ? (
              <>
                <NavLink to="/login" className="hover:text-orange-300">Login</NavLink>
                <NavLink to="/register" className="hover:text-orange-300">Register</NavLink>
              </>
            ) : (
              <div className="flex flex-col items-start w-full ">
                <NavLink
                  to={`/dashboard/${auth.user.role === 1 ? 'admin' : 'user'}`}
                  className="block w-full px-2 py-2 text-left text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </NavLink>
                <NavLink
                  onClick={handleLogout}
                  to="/login"
                  className="block w-full px-2 py-2 text-left text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </NavLink>
              </div>
            )}
            <Badge count={cart?.length} showZero className="px-2">
              <NavLink to="/cart" className="text-2xl">
                <MdShoppingCart />
              </NavLink>
            </Badge>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
