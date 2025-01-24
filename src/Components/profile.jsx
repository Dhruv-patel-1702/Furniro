import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
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
            <div className="mb-2">
              <span>{userDetails?.gender || 'Not specified'}</span>
            </div>

            <div className="mt-4">
              <button
                onClick={handleButtonClick}
                className="w-full bg-[#b88e2f] text-white rounded py-2 px-4 hover:bg-[#a07d2a] transition-colors"
              >
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white rounded py-2 px-4 hover:bg-red-600 transition-colors mt-2"
              >
                Logout
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
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full border rounded p-2 mb-4"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border rounded p-2 mb-4"
                />
                <button
                  onClick={handleChangePassword}
                  className="w-full bg-[#b88e2f] text-white rounded py-2 hover:bg-[#a07d2a] transition-colors"
                >
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
