import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartPopup from "./CartPopup";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const { cartItems, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-4 ">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold z-20">
            <img src="./assets/Logo.jpg" alt="" className="h-8 md:h-10" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-14  text-lg ">
            <Link to="/home" className="hover:text-[#B88E2F] transition-colors">
              Home
            </Link>
            <Link to="/shop" className="hover:text-[#B88E2F] transition-colors">
              Shop
            </Link>
            <Link to="/blog" className="hover:text-[#B88E2F] transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="hover:text-[#B88E2F] transition-colors">
              Contact
            </Link>
            <Link to="/myorders" className="hover:text-[#B88E2F] transition-colors">
              My Orders
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-8">
           <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
           <button className="hover:text-[#B88E2F] transition-colors w-8 h-8" >
              <PersonOutlineIcon className="w-full h-full" />
            </button>
           </Link>
            <button className="hover:text-[#B88E2F] transition-colors w-8 h-8">
              <SearchIcon className="w-full h-full" />
            </button>
            <button className="hover:text-[#B88E2F] transition-colors w-8 h-8">
              <FavoriteBorderIcon className="w-full h-full" />
            </button>
            <button
              className="relative hover:text-[#B88E2F] transition-colors w-8 h-8"
              onClick={() => setIsCartOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-full h-full"
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

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden z-20 hover:text-[#B88E2F] transition-colors"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="fixed inset-0 bg-white z-10 lg:hidden">
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                <Link 
                  to="/home" 
                  className="text-xl hover:text-[#B88E2F] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/shop" 
                  className="text-xl hover:text-[#B88E2F] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link 
                  to="/blog" 
                  className="text-xl hover:text-[#B88E2F] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  to="/contact" 
                  className="text-xl hover:text-[#B88E2F] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link 
                  to="/myorders" 
                  className="text-xl hover:text-[#B88E2F] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Orders
                </Link>

                {/* Mobile Icons */}
                <div className="flex items-center gap-8 mt-8">
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <button className="hover:text-[#B88E2F] transition-colors w-8 h-8">
                      <PersonOutlineIcon className="w-full h-full" />
                    </button>
                  </Link>
                  <button className="hover:text-[#B88E2F] transition-colors w-8 h-8">
                    <SearchIcon className="w-full h-full" />
                  </button>
                  <button className="hover:text-[#B88E2F] transition-colors w-8 h-8">
                    <FavoriteBorderIcon className="w-full h-full" />
                  </button>
                  <button
                    className="relative hover:text-[#B88E2F] transition-colors w-8 h-8"
                    onClick={() => {
                      setIsCartOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                   
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#B88E2F] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <CartPopup />
    </nav>
  );
};

export default Navbar;
