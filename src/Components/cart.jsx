import React from 'react';
import { useCart } from '../context/CartContext';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
      <div className="w-full h-[316px] bg-[url('./assets/cartbg.png')] bg-cover bg-center flex flex-col justify-center items-center relative">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white">
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-20 py-16">
        <div className="flex gap-12">
          {/* Cart Items Section */}
          <div className="flex-1">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 p-4 bg-[#f9f1e7] rounded-t-lg ">
              <div className="col-span-2 pl-16">Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
            </div>

            {/* Cart Items */}
            {cartItems.map((item) => (
              <div key={item.id} className="grid grid-cols-5 gap-4 p-4 border-b items-center">
                <div className="col-span-2 flex gap-4 items-center">
                  <img src={item.image} alt={item.name} className="w-[105px] h-[105px] object-cover" />
                  <h3 className="font-medium">{item.name}</h3>
                </div>
                <div>{item.price}</div>
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
          <div className="w-[400px]">
            <div className="bg-[#f9f1e7] p-8 rounded-lg">
              <h2 className="text-2xl font-medium mb-6">Cart Totals</h2>
              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pb-4">
                  <span className="font-medium">Total</span>
                  <span className="text-[#B88E2F] font-bold">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <button className="px-20 bg-white text-black py-3 rounded border border-black hover:bg-black hover:text-white transition-colors">
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

