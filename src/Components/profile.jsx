import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

const Profile = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [editableDetails, setEditableDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
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
            'Authorization': `${token}`,
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

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      setError("Both old and new passwords are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "https://ecommerce-shop-qg3y.onrender.com/api/user/changePassword",
        { oldPassword, newPassword },
        {
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
          },
        }
      );

      if (response.data && response.data.success) {
        setError("");
        setOldPassword("");
        setNewPassword("");
        closePopup();
      } else {
        setError("Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setError(error.response?.data?.message || "Error changing password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSaveInformation = async () => {
    try {
      if (!editableDetails?.name || !editableDetails?.email || !editableDetails?.mobile) {
        setError("Please fill in all required fields");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editableDetails.email)) {
        setError("Please enter a valid email address");
        return;
      }

      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(editableDetails.mobile)) {
        setError("Please enter a valid 10-digit mobile number");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to save changes");
        navigate("/login");
        return;
      }

      setError(""); 
      
      const response = await axios.put(
        "https://ecommerce-shop-qg3y.onrender.com/api/user/update",
        editableDetails,
        {
          headers: {
            'Authorization': `${token}`, 
            'Content-Type': 'application/json'
          },
        }
      );

      if (response.data && response.data.success) {
        setUserDetails(editableDetails);
        setError("");
        toast.success("Profile updated successfully!");
      } else {
        throw new Error(response.data?.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.response?.data?.message || error.message || "Error updating profile");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userDetails) {
      setEditableDetails({ ...userDetails });
    }
  }, [userDetails]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#b88e2f]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <h2 className="text-2xl font-semibold text-center mb-6">Profile Details</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                value={editableDetails?.name || ''}
                onChange={(e) => setEditableDetails({ ...editableDetails, name: e.target.value })}
                className=" block w-full rounded-md border border-gray-300 py-3 px-3 focus:outline-none focus:ring-1 focus:border-black
                "
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                value={editableDetails?.email || ''}
                onChange={(e) => setEditableDetails({ ...editableDetails, email: e.target.value })}
                className="block w-full rounded-md border border-gray-300 py-3 px-3 focus:outline-none focus:ring-1 focus:ring-[#b88e2f] focus:border-[#b88e2f]"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fas fa-phone"></i>
              </span>
              <input
                type="text"
                value={editableDetails?.mobile || ''}
                onChange={(e) => setEditableDetails({ ...editableDetails, mobile: e.target.value })}
                className="block w-full rounded-md border border-gray-300 py-3 px-3 focus:outline-none focus:ring-1 focus:ring-[#b88e2f] focus:border-[#b88e2f]"
                placeholder="Enter your mobile number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div className="mt-1">
              <select
                value={editableDetails?.gender || ''}
                onChange={(e) => setEditableDetails({ ...editableDetails, gender: e.target.value })}
                className="block w-full rounded-md border border-gray-300 py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#b88e2f] focus:border-[#b88e2f]"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button
              onClick={handleSaveInformation}
              className="w-full bg-[#c59d48] text-white rounded-md py-3 px-4 hover:bg-[#c59d48] transition-colors"
            >
              Save Information
            </button>
            
            <button
              onClick={handleButtonClick}
              className="w-full border border-gray-300 bg-white text-black rounded-md py-3 px-4 hover:bg-gray-50 transition-colors"
            >
              Change Password
            </button>

            <button
              onClick={handleLogout}
              className="w-full border border-gray-300 bg-white text-black rounded-md py-3 px-4 hover:bg-gray-50 transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need help? <a href="#" className="text-black hover:underline">Contact Support</a>
            </p>
          </div>
        </div>

        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Change Password</h2>
                <button onClick={closePopup} className="text-gray-500 hover:text-gray-700">
                  ×
                </button>
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className="space-y-4">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="pl-10 block w-full rounded-md border border-gray-300 py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#b88e2f] focus:border-[#b88e2f]"
                  />
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-10 block w-full rounded-md border border-gray-300 py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#b88e2f] focus:border-[#b88e2f]"
                  />
                </div>
                <button
                  onClick={handleChangePassword}
                  className="w-full bg-black text-white rounded-md py-3 hover:bg-gray-800 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
