import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const isEmail = emailRegex.test(identifier);
    const isMobile = mobileRegex.test(identifier);

    if (!isEmail && !isMobile) {
      alert("Please enter a valid email address or 10-digit mobile number");
      return;
    }

    try {
      setLoading(true);

      const loginData = {
        password: password,
      };

      if (isEmail) {
        loginData.email = identifier.toLowerCase().trim();
      } else {
        loginData.mobile = identifier.trim();
      }

      const response = await axios.post(
        "https://ecommerce-shop-qg3y.onrender.com/api/user/login",
        loginData
      );
      const result = response.data;

      console.log("API Response:", result);

      if (response.status === 200 && result.success && result.data) {
        localStorage.setItem("token", result.data);
        
        if (result.userId) {
          localStorage.setItem("userId", result.userId);
        }

        alert("Login successful!");
        navigate("/home");
      } else {
        const errorMessage = result.message || "Login failed. Please try again.";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage = error.response?.data?.message || "Network error or server not responding. Please try again later.";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage:
          'url("https://cdn.prod.website-files.com/5ee0a01c741b15ab8ec28a14/65d625a7245d87ba6cd375a5__id%3D68.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number or Email (only one required)
          </label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
          <div className="text-right mt-1">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-[#b88e2f] hover:text-[#a07d2a] transition-colors"
            >
              Forgot Password?
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#b88e2f] text-white py-2 rounded-md hover:bg-[#a07d2a] transition-colors"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="w-full bg-gray-500 text-white py-2 rounded-md mt-2 hover:bg-gray-600 transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
