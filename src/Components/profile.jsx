import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      // Get token from localStorage (stored during login)
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("Please login to view your profile");
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "https://ecommerce-shop-qg3y.onrender.com/api/user/profileDisplay",
        {
          headers: {
            'Authorization': `${token}`, // Using Bearer token format
            'Content-Type': 'application/json'
          },
        }
      );

      console.log("Profile Response:", response.data);

      if (response.data && response.data.success) {
        setUserDetails(response.data.data);
        setError("");
      } else {
        setError("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        setError("Session expired. Please login again");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError(error.response?.data?.message || "Error loading profile");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#b88e2f]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[100vh] bg-[url('https://t4.ftcdn.net/jpg/03/17/30/63/240_F_317306393_XTASW9Dx8kpxcm6xNOpOTY4ARdyBVBYt.jpg')] bg-cover bg-center relative">
      <div className="w-full max-w-md mx-auto">
        <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <div className="flex flex-col items-center mb-4">
            <img
              src="/assets/card5.png"
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-[#9c7827] mb-4"
            />
          </div>
          <h1 className="text-2xl font-bold mb-4">Profile Details</h1>
          <div className="flex flex-col mb-4">
            <label className="font-semibold">Name:</label>
            <input
              type="text"
              value={userDetails?.name || ''}
              readOnly
              className="border rounded p-2 mb-2 bg-gray-50"
            />

            <label className="font-semibold">Email Address:</label>
            <input
              type="email"
              value={userDetails?.email || ''}
              readOnly
              className="border rounded p-2 mb-2 bg-gray-50"
            />

            <label className="font-semibold">Mobile Number:</label>
            <input
              type="text"
              value={userDetails?.mobile || ''}
              readOnly
              className="border rounded p-2 mb-2 bg-gray-50"
            />
            <label className="font-semibold">Gender:</label>
            <div className="flex mb-2">
              <label className="mr-4">
                <input 
                  type="radio" 
                  name="gender" 
                  value="Male" 
                  checked={userDetails?.gender === 'Male'} 
                  readOnly 
                /> Male
              </label>
              <label className="mr-4">
                <input 
                  type="radio" 
                  name="gender" 
                  value="Female" 
                  checked={userDetails?.gender === 'Female'} 
                  readOnly 
                /> Female
              </label>
              <label>
                <input 
                  type="radio" 
                  name="gender" 
                  value="Other" 
                  checked={userDetails?.gender === 'Other'} 
                  readOnly 
                /> Other
              </label>
            </div>

            <div className="mt-4">
              <button
                onClick={handleButtonClick}
                className="w-full bg-[#b88e2f] text-white rounded py-2 px-4 hover:bg-[#a07d2a] transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>

          {isPopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Change Password</h2>
                  <button onClick={closePopup} className="text-gray-500 hover:text-gray-700">
                    ×
                  </button>
                </div>
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full border rounded p-2 mb-4"
                />
                <button
                  onClick={closePopup}
                  className="w-full bg-[#b88e2f] text-white rounded py-2 hover:bg-[#a07d2a] transition-colors"
                >
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          className={`fixed right-0 top-0 w-1/3 bg-white shadow-lg transition-transform ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button onClick={toggleCart} className="absolute top-2 right-2">
            ✖
          </button>
          <h2 className="text-xl font-bold p-4">Shopping Cart</h2>
          <div className="p-4">
            <p>Your cart is empty</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
