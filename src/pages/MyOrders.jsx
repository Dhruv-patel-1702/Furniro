import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Please login to view orders');
                    return;
                }

                const response = await axios.get(
                    'https://ecommerce-shop-qg3y.onrender.com/api/order/displayAllOrder',
                    {
                        headers: {
                            'Authorization': `${token}`
                        }
                    }
                );

                if (response.data.success) {
                    const sortedOrders = response.data.data.sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    });
                    setOrders(sortedOrders);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const fetchOrderDetails = async (orderId) => {
        console.log("Attempting to fetch details for order ID:", orderId);

        try {
            const response = await axios.get(
                `https://ecommerce-shop-qg3y.onrender.com/api/order/displayOrder/${orderId}`,
                {
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`
                    }
                }
            );

            if (response.data.success) {
                console.log("Order details fetched successfully:", response.data.data);
            } else {
                setError('Failed to fetch order details: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error fetching order details:', error);
            setError('Failed to fetch order details: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3BB77E]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:mt-[220px] lg:mt-0">
            <h1 className="text-2xl font-semibold text-[#253D4E] mb-6">My Orders</h1>
            
            {orders.length === 0 ? (
                <div className="text-center py-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <p className="text-gray-600">No orders found.</p>
                    </div>
                    <Link 
                        to="/shop" 
                        className="inline-block mt-4 px-6 py-2 bg-[#3BB77E] text-white rounded-full hover:bg-[#2a9c66] transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-600">Order ID:</p>
                                    <p className="font-medium">{order._id}</p>
                                </div>
                                <div className="mt-2 md:mt-0">
                                    <p className="text-sm text-gray-600">Ordered on:</p>
                                    <p className="font-medium">
                                        {new Date(order.createdAt).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                                <div className="mt-2 md:mt-0 text-right">
                                    <p className="text-sm text-gray-600">Total Amount:</p>
                                    <p className="text-lg font-semibold text-[#3BB77E]">₹{order.totalAmount}</p>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-600">
                                        Payment Method: <span className="font-medium">Cash on Delivery</span>
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

export default MyOrders; 