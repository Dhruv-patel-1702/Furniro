import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AllOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  console.log(orders)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to view orders");
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "https://ecommerce-shop-qg3y.onrender.com/api/order/displayAllOrder",
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.response?.data?.message || "Error loading orders");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#b98f32]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:mt-40 ">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12 ">
          <p className="text-gray-600 text-lg">No orders found</p>
          <button
            onClick={() => navigate("/shop")}
            className="mt-4 bg-[#b98f32] text-white px-6 py-2 rounded-full hover:bg-[#2a9c66] transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6 border-[2px]">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
              {/* Order Header */}
              <div className="flex justify-between items-start border-b pb-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Color ID:</p>
                  <p className="font-medium">{order._id}</p>
                  <p className="text-sm text-gray-600 mt-1">Ordered on:</p>
                  <p className="font-medium">{formatDate(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#b98f32]">
                    ₹{order.totalAmount}
                  </p>
                  <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-20 h-20 flex-shrink-0">
                      {item.productDetails?.product_images?.[0] ? (
                        <img
                          src={item.productDetails.product_images[0]}
                          alt={item.productName}
                          className="w-full h-full object-cover rounded"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.parentElement.innerHTML = `
                                                            <div class="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                                                                <span class="text-gray-400 text-xs text-center p-2">${item.productName}</span>
                                                            </div>
                                                        `;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-gray-400 text-xs text-center p-2">
                            {item.productName}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.productName}</h3>
                      <div className="mt-1 text-sm text-gray-600 grid grid-cols-2 gap-2">
                        <p>Size: {item?.productSize}</p>
                        <p>Color: {item?.productColour}</p>
                        <p>Quantity: {item?.quantity}</p>
                      </div>
                      <p className="mt-1 text-[#b98f32] font-medium">
                        ₹{item?.price} × {item?.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Address */}
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2">Delivery Address</h4>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-800">
                    {order.deliveryAddress.fullName}
                  </p>
                  <p className="mt-1">📱 {order.deliveryAddress.phoneNumber}</p>
                  <p>{order.deliveryAddress.addressLine1}</p>
                  {order.deliveryAddress.addressLine2 && (
                    <p>{order.deliveryAddress.addressLine2}</p>
                  )}
                  {order.deliveryAddress.landmark && (
                    <p>{order.deliveryAddress.landmark}</p>
                  )}
                  <p>
                    {order.deliveryAddress.city}, {order.deliveryAddress.state}{" "}
                    - {order.deliveryAddress.pincode}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;
