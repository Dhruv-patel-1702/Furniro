import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Order = () => {
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);
  console.log(shippingAddress)
  const [error, setError] = useState(null);
  const { cartItems, cartTotal, clearCart: clearCartFunction } = useCart();
  console.log(cartItems[0].categoryId);
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  
  const [orderDetails, setOrderDetails] = useState({
    orderId: "#ORD" + Math.floor(Math.random() * 1000000),
    date: new Date().toISOString().split("T")[0],
    status: "Processing",
    shipping: 5.99,
    tax: cartTotal * 0.1,
  });

  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (location.state?.selectedAddress) {
      setSelectedAddress(location.state.selectedAddress);
      setShippingAddress(location.state.selectedAddress);
    } else {
      fetchAddress();
    }
  }, [location.state]);

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
          console.log(defaultAddress)
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
    return cartTotal + 0 + 0;
  };

  const createOrder = async () => {
    if (!selectedAddress && !shippingAddress) {
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
      
console.log(cartItems)
      const formattedItems = cartItems.map((item) => ({
        productId: item.cartId,
        productName: item.name ,
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity),
        productDescription: item.description,
        productCategory: item.categoryId ,
        productSize: item.selectedSize ,
        productColour: item.selectedColor ,
        product_details: item.details ,
      }));
      console.log(formattedItems)
      
      const orderData = {
        items: formattedItems,
        totalAmount: calculateTotal(),
        paymentMethod: "Cash on Delivery",
        deliveryAddress: shippingAddress._id,
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

      console.log("Response from API:", response.data);

      if (response.data && response.data.success) {
        localStorage.setItem('shouldOpenCart', 'true');
        const orderId = response.data.data._id;
        localStorage.setItem("lastOrderId", orderId);

        toast.success(
          "🎉 Order placed successfully! You can view your order details in My Orders page" 
        );

        if (typeof clearCartFunction === "function") {
          clearCartFunction();
        } else {
          console.warn("clearCart is not available");
        }

        setTimeout(() => {
          navigate("/myorders");
          window.location.reload();
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

  const handleEdit = () => {
    navigate("/myAddress", { state: { currentAddress: selectedAddress } });
  };

  const renderShippingAddress = () => {
    if (loading) return <p className="text-gray-600">Loading address...</p>;
    if (!shippingAddress) return <p className="text-gray-600">No address selected</p>;

    return (
      <div className="space-y-2 w-80">
        <div className="space-y-1 text-gray-600">
          <p>{shippingAddress.fullName}</p>
          <p>📞 {shippingAddress.phoneNumber}</p>
          {shippingAddress.addressLine1}
          {shippingAddress.addressLine2 && `, ${shippingAddress.addressLine2}`}
          {shippingAddress.landmark && ", " + shippingAddress.landmark}
          {shippingAddress.city}, {shippingAddress.state}, {shippingAddress.pincode}
          , {shippingAddress.address_type}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-28 mb-10">

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
                src={item.image[0]}
                alt={item.name}
                className="w-full h-full object-cover overflow-hidden"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.name || item.title}</h3>
              {/* <h2 className="font"> Description: {item.description}</h2> */}
                <span>size:{item.selectedSize} </span>
                <br />
                <span>colour:{item.selectedColor}</span>
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
        <p>Shipping: ₹{orderDetails.shipping}</p>
        <p>Tax: ₹{orderDetails.tax}</p>
        <p className="font-bold">Total: ₹{cartTotal.toFixed(2 )}</p>
      </div>


      <div className="bg-[#FFF9F1] p-6 rounded-lg border border-[#B88E2F]/20">
        <h2 className="text-xl font-semibold mb-4 text-[#B88E2F]">
          Shipping Address
        </h2>
        {renderShippingAddress()}
        <button
          onClick={() => handleEdit()}
          className="flex-1 px-8 py-2 mt-2 bg-[#B88E2F] text-white rounded-md hover:bg-[#a17e2a] transition-colors"
        >
          change Address
        </button>
      </div>

      <button
        type="button"
        onClick={createOrder}
        disabled={loading}
        className={`w-full ${
          loading ? "bg-[#B88E2F]/50" : "bg-[#B88E2F]"
        } text-white py-3 mt-6 rounded-md flex items-center justify-center`}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
            Processing...
          </>
        ) : (
          "Place Order"
        )}
      </button>
    </div>
  );
};

export default Order;