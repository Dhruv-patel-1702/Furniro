import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { PiEyeSlashLight } from "react-icons/pi";
import { IoEyeSharp } from "react-icons/io5";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        if (isMobile) {
          loginData.mobile = identifier.trim();
        } else {
          toast.error("Mobile number and Email Required");
          return;
        }
      }

      const response = await axios.post(
        "https://ecommerce-shop-qg3y.onrender.com/api/user/login",
        loginData
      );
      const result = response.data;

      console.log("API Response:", result);

      if (response.status === 200 && result.success && result.data) {
        window.location.reload();
        localStorage.setItem("token", result.data);

        if (result.userId) {
          localStorage.setItem("userId", result.userId);
        }

        toast.success("Login successful!");
      } else {
        const errorMessage =
          result.message || "Login failed. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Network error or server not responding. Please try again later.";
      toast.error(errorMessage);
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
        <h2 className="text-2xl font-semibold mb-3">Email or Mobile</h2>

        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <input
              type="text"
              value={identifier}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value) || /^[^\d]*$/.test(value)) {
                  setIdentifier(value);
                }
              }}
              placeholder="Enter your email or mobile"
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-black"
            />
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-3">Password</h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-black"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-4 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeSharp /> : <PiEyeSlashLight />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex-grow"></div>
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
            <span className="px-4 text-sm text-black">Or</span>
            <div className="border-t border-gray-200 w-full"></div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50"
            >
              <svg
                className="h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50"
            >
              <svg
                className="h-5 w-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16.365 1.43c-.852.842-1.52 2.027-1.35 3.217 1.147.098 2.33-.563 3.047-1.343.747-.809 1.328-1.982 1.17-3.177-1.176-.05-2.393.588-2.867 1.303zM20.708 15.183c-.803 1.63-1.65 3.064-2.95 3.08-1.286.016-1.624-.994-3.344-.982-1.72.012-2.09.99-3.384.974-1.288-.016-2.258-1.54-3.064-3.17C6.06 13.554 5.38 11.133 6.19 9.315c.873-1.928 2.52-3.158 4.374-3.173 1.293-.012 2.514.89 3.344.89.816 0 2.327-1.1 3.92-.936.667.028 2.533.27 3.72 2.045-2.96 1.31-2.49 5.243.16 6.043z" />
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
