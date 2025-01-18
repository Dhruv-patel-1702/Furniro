import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartPopup from "./CartPopup";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Navbar = () => {
  const { cartItems, setIsCartOpen } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="max-w-[1440px] mx-auto  py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold">
            <img src="./assets/Logo.jpg" alt="" />
          </Link>

          <div className="flex items-center gap-20">
            <Link to="/" className="hover:text-[#B88E2F] transition-colors">
              Home
            </Link>
            <Link to="/shop" className="hover:text-[#B88E2F] transition-colors">
              Shop
            </Link>
            <Link 
              to="/blog"
              className="hover:text-[#B88E2F] transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#B88E2F] transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-10">
            {/* Profile Icon */}
            <button className="hover:text-[#B88E2F] transition-colors">
              <PersonOutlineIcon />
            </button>

            {/* Search Icon */}
            <button className="hover:text-[#B88E2F] transition-colors">
              <SearchIcon />
            </button>

            {/* Favorites Icon */}
            <button className="hover:text-[#B88E2F] transition-colors">
              <FavoriteBorderIcon />
            </button>

            {/* Cart Icon */}
            <button
              className="relative hover:text-[#B88E2F] transition-colors "
              onClick={() => setIsCartOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#B88E2F] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <CartPopup />
    </nav>
  );
};

export default Navbar;
