import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full bg-white py-12 border-t">
      <div className="w-full mx-auto px-28">
        <div className="grid grid-cols-4 gap-20">
          {/* Column 1 - Address */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Funiro.</h2>
            <p className="text-[#9F9F9F] leading-relaxed">
              400 University Drive Suite 200 Coral Gables,
              <br />FL 33134 USA
            </p>
          </div>

          {/* Column 2 - Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-[#9F9F9F]">Links</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-black hover:text-[#B88E2F] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-black hover:text-[#B88E2F] transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-black hover:text-[#B88E2F] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-black hover:text-[#B88E2F] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Help */}
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-[#9F9F9F]">Help</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/payment" className="text-black hover:text-[#B88E2F] transition-colors">
                  Payment Options
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-black hover:text-[#B88E2F] transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-black hover:text-[#B88E2F] transition-colors">
                  Privacy Policies
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="space-y-6 ">
            <h4 className="text-lg font-medium text-[#9F9F9F]">Newsletter</h4>
            <div className="flex gap-5 underline space-y-4">
              <div className="border-b border-black pb-2">
                <input 
                  type="email" 
                  placeholder="Enter Your Email Address" 
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
              <button className="text-black text-sm font-bold hover:text-[#B88E2F] transition-colors uppercase">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-6 border-t">
          <p className="text-[#9F9F9F]">2023 furino. All rights reverved</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
