import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Order = () => {
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [error, setError] = useState(null);
  const { cartItems, cartTotal, clearCart: clearCartFunction } = useCart();
  console.log(cartItems)
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  const [orderDetails, setOrderDetails] = useState({
    orderId: "#ORD" + Math.floor(Math.random() * 1000000),
    date: new Date().toISOString().split("T")[0],
    status: "Processing",
    shipping: 5.99,
    tax: cartTotal * 0.1,
  });

  useEffect(() => {
    fetchAddress();
  }, []);

  useEffect(() => {
    if (shippingAddress) {
      setSelectedAddress(shippingAddress);
    }
  }, [shippingAddress]);

  const fetchAddress = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login to view address");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "https://ecommerce-shop-qg3y.onrender.com/api/address/displayAllAdress",
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.success && Array.isArray(response.data.data)) {
        const defaultAddress =
          response.data.data.find((addr) => addr.isDefault) ||
          response.data.data[0];

        setShippingAddress(defaultAddress);
        setError(null);
      } else {
        setError("No address found. Please add a shipping address.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setError("Unable to fetch address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  

  const calculateTotal = () => {
    return cartTotal + orderDetails.shipping + orderDetails.tax;
  };

  const createOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to continue");
        navigate("/");
        return;
      }

      const formattedItems = cartItems.map((item) => ({
        productId: item.cartId,
        productName: item.name || item.title,
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity),
        productDescription: item.description || "Product Description",
        productCategory: item.category || "General",
        productSize: item.size || "Standard",
        productColour: item.color || "Default",
        product_details: item.details || "Product Details",
      }));

      const orderData = {
        items: formattedItems,
        totalAmount: calculateTotal(),
        paymentMethod: "Cash on Delivery",
        deliveryAddress: selectedAddress._id,
        shippingCharges: orderDetails.shipping,
        tax: orderDetails.tax,
        orderId: orderDetails.orderId,
      };

      
      const response = await axios.post(
        "https://ecommerce-shop-qg3y.onrender.com/api/order/createOrder",
        orderData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log('Response from API:', response.data);

      if (response.data && response.data.success) {
        const orderId = response.data.data._id;
        localStorage.setItem("lastOrderId", orderId);

        toast.success(
          "🎉 Order placed successfully! You can view your order details in My Orders page"
        );

        if (typeof clearCartFunction === 'function') {
          clearCartFunction();
        } else {
          console.warn('clearCart is not available');
        }
        
        setTimeout(() => {
          navigate("/myorders");
        }, 2000);
      } else {
        throw new Error(response.data.message || "Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error(
        error.response?.data?.message || error.message || "Error creating order"
      );
    } finally {
      setLoading(false);
    }
  };

  const renderShippingAddress = () => {
    if (loading) return <p className="text-gray-600">Loading address...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!shippingAddress)
      return <p className="text-gray-600">No address found</p>;

    return (
      <div className="space-y-1">
        <p className="font-medium">{shippingAddress.fullName}</p>
        <p>{shippingAddress.addressLine1}</p>
        {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
        {shippingAddress.landmark && (
          <p>Landmark: {shippingAddress.landmark}</p>
        )}
        <p>{`${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.pincode}`}</p>
        <p>{shippingAddress.country}</p>
        <p>Phone: {shippingAddress.phoneNumber}</p>
        <p>Address Type: {shippingAddress.addressType}</p>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-28 mb-10">
      <div className="bg-[#FFF9F1] p-6 rounded-lg mb-6 border border-[#B88E2F]/20">
        <h2 className="text-xl font-semibold mb-4 text-[#B88E2F]">
          Order Information
        </h2>
        <p>
          <strong>Order ID:</strong> {orderDetails.orderId}
        </p>
        <p>
          <strong>Date:</strong> {orderDetails.date}
        </p>
        <p>
          <strong>Status:</strong> {orderDetails.status}
        </p>
      </div>

      <div className="bg-[#FFF9F1] p-6 rounded-lg mb-6 border border-[#B88E2F]/20">
        <h2 className="text-xl font-semibold mb-4 text-[#B88E2F]">
          Cart Items
        </h2>
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 mb-4 border-b pb-4"
          >
            <div className="w-16 h-16 bg-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover overflow-hidden"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.name || item.title}</h3>
              <div className="text-sm text-gray-600">
                <span>
                  {item.quantity} x ₹{item.price}
                </span>
                {item.size && <span className="ml-4">Size: {item.size}</span>}
                {item.color && (
                  <span className="ml-4">Colour: {item.color}</span>
                )}
              </div>
            </div>
            <div className="font-medium">
              ₹{(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#FFF9F1] p-6 rounded-lg mb-6 border border-[#B88E2F]/20">
        <h2 className="text-xl font-semibold mb-4 text-[#B88E2F]">
          Price Details
        </h2>
        <p>Subtotal: ₹{cartTotal.toFixed(2)}</p>
        <p>Shipping: ₹{orderDetails.shipping.toFixed(2)}</p>
        <p>Tax: ₹{orderDetails.tax.toFixed(2)}</p>
        <p className="font-bold">Total: ₹{calculateTotal().toFixed(2)}</p>
      </div>

      <div className="bg-[#FFF9F1] p-6 rounded-lg mb-6 border border-[#B88E2F]/20">
        <h2 className="text-xl font-semibold mb-4 text-[#B88E2F]">
          Payment Method
        </h2>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="COD"
            checked={selectedPaymentMethod === "COD"}
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          />
          <span>Cash on Delivery</span>
        </label>
      </div>

      <div className="bg-[#FFF9F1] p-6 rounded-lg border border-[#B88E2F]/20">
        <h2 className="text-xl font-semibold mb-4 text-[#B88E2F]">
          Shipping Address
        </h2>
        {renderShippingAddress()}
      </div>

      <button
        onClick={createOrder}
        disabled={loading}
        className={`w-full ${
          loading ? 'bg-[#B88E2F]/50' : 'bg-[#B88E2F]'
        } text-white py-3 mt-6 rounded-md flex items-center justify-center`}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
            Processing...
          </>
        ) : (
          'Place Order'
        )}
      </button>
    </div>
  );
};

export default Order;
