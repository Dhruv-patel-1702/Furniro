import React from 'react';
import { useCart } from '../context/CartContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const handleQuantityChange = (itemId, change) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateQuantity(itemId, newQuantity);
    }
  };

  const subtotal = calculateSubtotal();

  return (
    <div className="mt-[75px] min-h-screen bg-white">
      {/* Header Section */}
      <div className="w-full h-[316px] bg-[url('/assets/cartbg.png')] bg-cover bg-center flex flex-col justify-center items-center relative">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white">
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-20 py-16">
        <div className="flex flex-col sm:flex-row gap-12">
          {/* Cart Items Section */}
          <div className="flex-1">
            {/* Table Header */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 p-4 bg-[#f9f1e7] font-medium  ">
              <div className="col-span-2 pl-4 sm:pl-16">Product</div>
              <div className="hidden sm:block">Price</div>
              <div className="hidden sm:block">Quantity</div>
              <div className="hidden sm:block">Subtotal</div>
            </div>

            {/* Cart Items */}
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-2 sm:grid-cols-5 gap-4 p-4 border-b items-center">
                  <div className="col-span-2 flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-[80px] h-[80px] sm:w-[105px] sm:h-[105px] object-cover" />
                    <h3 className="font-medium text-sm sm:text-base">{item.name}</h3>
                  </div>
                  <div className="hidden sm:block">{item.price}</div>
                  <div>
                    <input 
                      type="number" 
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 p-2 border rounded text-center"
                      min="1"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Rs. {(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity).toLocaleString()}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <DeleteOutlineIcon />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Cart Totals Section */}
          <div className="w-full sm:w-[380px]">
            <div className="bg-[#f9f1e7] p-4 sm:p-8 h-auto sm:h-[380px]">
              <h2 className="text-xl sm:text-2xl font-medium mb-16 text-center">Cart Totals</h2>
              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pb-4">
                  <span className="font-medium">Total</span>
                  <span className="text-[#B88E2F] font-bold">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className='flex justify-center'>
                  <Link to="/checkout">
                    <button className="px-16 sm:px-20 bg-white text-black py-2 sm:py-3 rounded border border-black hover:bg-black hover:text-white transition-colors">
                      Check Out
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      {/* Footer Section */}
      <div className="flex items-center w-full bg-[#FAF3EA] h-auto">
        <div className="max-w-[1440px] mx-auto px-4 py-10 sm:px-28">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-28">
            {/* High Quality */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">High Quality</h3>
                <p className="text-[#898989] text-sm">
                  crafted from top materials
                </p>
              </div>
            </div>

            {/* Warranty Protection */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                </svg>
            </div>

            {/* 24/7 Support */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">24 / 7 Support</h3>
                <p className="text-[#898989] text-sm">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Cart;

