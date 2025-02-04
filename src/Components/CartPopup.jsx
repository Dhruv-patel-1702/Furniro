import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";

const CartPopup = ({ onClose }) => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    cartTotal,
    setCartItems,
    clearCart,
  } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const fetchCartData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to view your cart");
        setIsLoading(false);
        return;
      }
      const response = await axios.get(
        "https://ecommerce-shop-qg3y.onrender.com/api/cart/displayCart",
        {
          headers: {
            Authorization: `${token}`,
          }
        }
      );

      if (response.data.success && response.data.data.length > 0) {
        const cartData = response.data.data[0];
        const transformedItems = cartData.items.map(item => ({
          cartId: item.productId,
          name: item.productName,
          image: item.productImage,
          price: item.price,
          quantity: item.quantity,
          selectedSize: item.size || item.productSize || (item.productDetails?.size?.[0] || 'N/A'),
          selectedColor: item.colour || item.productColour || (item.productDetails?.colour?.[0] || 'N/A')
        }));
        setCartItems(transformedItems);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      if (error.response?.status === 401) {
        toast.error("Please login to view your cart");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = async (itemId, action) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to update cart');
        return;
      }

      const currentItem = cartItems.find(item => item.cartId === itemId);
      if (!currentItem) return;

      let newQuantity;
      if (action === 'increase') {
        newQuantity = parseInt(currentItem.quantity) + 1;
      } else if (action === 'decrease') {
        newQuantity = Math.max(1, parseInt(currentItem.quantity) - 1);
      } else {
        return;
      }

      const response = await axios.put(
        'https://ecommerce-shop-qg3y.onrender.com/api/cart/updateCart',
        {
          productId: itemId,
          quantity: newQuantity,
          productColour: currentItem.selectedColor,
          productSize: currentItem.selectedSize
        },
        { 
          headers: { 
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        toast.success("Cart updated successfully");
        const updatedCartItems = cartItems.map(item =>
          item.cartId === itemId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCartItems);
      } else {
        toast.error(response.data.message || "Failed to update cart");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error('Failed to update cart');
    }
  };

  useEffect(() => {
    if (isCartOpen) {
      fetchCartData();
    }
  }, [isCartOpen, setCartItems]);

  const handleViewCart = () => {
    navigate("/cart");
    onClose();
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsCartOpen(false);
    const sidebar = document.querySelector(".blog-sidebar");
    if (sidebar) {
      sidebar.style.display = "none";
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to remove items");
        navigate("/");
        return;
      }

      const itemToRemove = cartItems.find(item => item.cartId === productId);
      if (!itemToRemove) {
        toast.error("Item not found in cart");
        return;
      }

      const response = await axios.delete(
        `https://ecommerce-shop-qg3y.onrender.com/api/cart/removeCart`,
        {
          headers: {
            'Authorization': `${token}`
          },
          data: { 
            productId:productId, 
            productColour: itemToRemove.selectedColor,
            productSize: itemToRemove.selectedSize
          }
        }
      );

      const updatedCartItems = cartItems.filter(item => item.cartId !== productId);
      setCartItems(updatedCartItems);
      
      if (response.data.success) {
        toast.success("Item removed from cart");
      } else if (response.data.message === "Cart not found for this user") {
        setCartItems([]);
        toast.info("Cart is empty");
      } else {
        toast.warning("Failed to remove cart item");
      }

    } catch (error) {
      console.error("Error removing item:", error);
      const updatedCartItems = cartItems.filter(item => item.cartId !== productId);
      setCartItems(updatedCartItems);
      toast.warning("Failed to remove cart item");
    }
  };


  if (isLoading) {
    return <div className="text-center py-8">Loading cart...</div>;
  }

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30"
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div className="relative w-[450px] h-screen bg-white shadow-lg ">
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
              <div className="py-4 space-y-6">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="flex gap-4">
                    <div className="w-[100px] h-[100px] bg-[#F9F1E7] p-2">
                      {item.image ? (
                        <img
                          src={item.image[0]}
                          alt={item.name}
                          className="w-full h-full object-contain overflow-hidden"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold truncate max-w-[200px]">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => handleRemoveItem(item.cartId)}
                          className="text-gray-400 hover:text-gray-600 cursor-pointer"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <CloseIcon fontSize="small" />
                        </button>
                      </div>

                      <div className="flex flex-row gap-x-2">
                        <div className="mt-2 flex items-center gap-2 text-sm">
                          <span>{item.quantity}</span>
                          <span>x</span>
                          <span className="text-[#B88E2F]">
                            Rs. {item.price}
                          </span>
                        </div>
                        <span className="mt-1">|</span>
                        <div className="mt-2 flex items-center gap-2 text-sm">
                          <span className="font-medium">Size:</span>
                          <span>{item.selectedSize}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm">
                        <span className="font-medium">Colour : </span>
                        <span>{item.selectedColor}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal */}
              <div className="flex justify-center items-center">
                <div className="pt-4 absolute bottom-0 px-2 pb-5 w-full bg-white">
                  <div className="flex justify-between items-center mb-6 px-6">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      Rs. {cartTotal.toLocaleString()}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <p className="border-t mb-6"></p>
                  <div className="flex items-center justify-center gap-x-2">
                    <button
                      onClick={() => handleNavigation("/order")}
                      className="col-span-1 py-2 px-4 border border-[#B88E2F] text-[#B88E2F] text-center hover:bg-[#B88E2F] hover:text-white transition-colors rounded-full"
                    >
                      Checkout
                    </button>
                    <button
                      onClick={() => handleNavigation("/compare")}
                      className="col-span-1 py-2 px-4 border border-[#B88E2F] text-[#B88E2F] text-center hover:bg-[#B88E2F] hover:text-white transition-colors rounded-full"
                    >
                      Comparison
                    </button>
                  </div>
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