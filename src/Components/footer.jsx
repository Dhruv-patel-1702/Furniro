import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white py-8 md:py-12 border-t">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-48">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
          {/* Column 1 - Address */}
          <div className="space-y-4 md:space-y-6 text-center sm:text-left">
            <h2 className="text-xl md:text-2xl font-bold">Funiro.</h2>
            <p className="text-[#9F9F9F] text-sm md:text-base leading-relaxed">
              400 University Drive Suite 200 Coral Gables,
              <br />
              FL 33134 USA
            </p>
          </div>

          {/* Column 2 - Links */}
          <div className="space-y-4 md:space-y-6 text-center sm:text-left">
            <h4 className="text-base md:text-lg font-medium text-[#9F9F9F]">
              Links
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-sm md:text-base text-black hover:text-[#B88E2F] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-sm md:text-base text-black hover:text-[#B88E2F] transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-sm md:text-base text-black hover:text-[#B88E2F] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm md:text-base text-black hover:text-[#B88E2F] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Help */}
          <div className="space-y-4 md:space-y-6 text-center sm:text-left">
            <h4 className="text-base md:text-lg font-medium text-[#9F9F9F]">
              Help
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <Link
                  to="/payment"
                  className="text-sm md:text-base text-black hover:text-[#B88E2F] transition-colors"
                >
                  Payment Options
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-sm md:text-base text-black hover:text-[#B88E2F] transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm md:text-base text-black hover:text-[#B88E2F] transition-colors"
                >
                  Privacy Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="space-y-4 md:space-y-6 text-center sm:text-left">
            <h4 className="text-base md:text-lg font-medium text-[#9F9F9F]">
              Newsletter
            </h4>
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <div className="w-[600px] max-w-[280px] sm:max-w-none border-b border-black pb-2">
                {" "}
                {/* Increased width */}
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  className="w-full bg-transparent outline-none text-sm md:text-base placeholder:text-sm md:placeholder:text-base"
                />
              </div>
              <button className="text-black text-sm md:text-base font-bold hover:text-[#B88E2F] transition-colors uppercase whitespace-nowrap">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 md:mt-16 pt-6 border-t">
          <p className="text-[#9F9F9F] text-sm md:text-base text-center sm:text-left">
            2023 furino. All rights reverved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
