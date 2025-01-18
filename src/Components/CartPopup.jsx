import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const CartPopup = ({ onClose }) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, cartTotal } = useCart();

  const handleViewCart = () => {
    navigate('/cart');
    onClose(); // Close the popup when navigating
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/30"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Cart Panel */}
      <div className="relative w-[400px] h-screen bg-white shadow-lg overflow-auto">
        <div className="p-5">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b">
            <h2 className="text-xl font-medium">Shopping Cart</h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <CloseIcon />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty</p>
          ) : (
            <>
              {/* Cart Items */}
              <div className="py-4 space-y-6 ">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-[100px] h-[100px] bg-[#F9F1E7] p-2">
                      <img 
                        src={item.images?.[0] || item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 mt-5">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <CloseIcon fontSize="small" />
                        </button>
                      </div>
                      
                      {/* Quantity x Price */}
                      <div className="mt-2 flex items-center gap-2 text-sm">
                        <span>{item.quantity}</span>
                        <span>x</span>
                        <span className="text-[#B88E2F]">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal */}
              <div className=" pt-4 absolute bottom-0 px-2 pb-5">
                <div className="flex justify-between items-center mb-6 px-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rs. {cartTotal.toLocaleString()}</span>
                </div>

                {/* Action Buttons */}
                <p className='border-t mb-6'></p>
                <div className="grid grid-cols-3 gap-2 ">
                  <Link 
                    to="/cart" 
                    className="col-span-1 py-2 px-4 border border-[#B88E2F] text-[#B88E2F] text-center hover:bg-[#B88E2F] hover:text-white transition-colors rounded-full"
                  >
                    Cart
                  </Link>
                  <Link 
                    to="/checkout" 
                    className="col-span-1 py-2 px-4 border border-[#B88E2F] text-[#B88E2F] text-center hover:bg-[#B88E2F] hover:text-white transition-colors rounded-full"
                  >
                    Checkout
                  </Link>
                  <Link 
                    to="/compare" 
                    className="col-span-1 py-2 px-4 border  border-[#B88E2F] text-[#B88E2F] text-center hover:bg-[#B88E2F] hover:text-white transition-colors rounded-full"
                  >
                    Comparison
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPopup; 