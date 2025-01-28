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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md px-8 py-8 rounded-lg shadow-xl border border-gray-200"
      >
        <h2 className="text-2xl font-semibold mb-8">Email</h2>
        
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-black"
            />
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-4">Password</h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-black"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-4 flex items-center"
              onClick={() => {}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-[#b88e2f]" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-black hover:text-black"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#c59d48] text-white py-3 rounded-full font-medium hover:hover:bg-[#9c7d39] transition-colors"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-black hover:text-black font-medium"
          >
            Register
          </button>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-center">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="px-4 text-sm text-black">Or with</span>
            <div className="border-t border-gray-200 w-full"></div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              Apple
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
