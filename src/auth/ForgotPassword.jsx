import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify'
import { PiEyeSlashLight } from "react-icons/pi";
import { IoEyeSharp } from "react-icons/io5";

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const isEmail = emailRegex.test(identifier);
    const isMobile = mobileRegex.test(identifier);

    if (!isEmail && !isMobile) {
      ('Please enter a valid email address or 10-digit mobile number');
      return;
    }

    try {
      setLoading(true);
      // Store identifier in localStorage
      localStorage.setItem('resetIdentifier', identifier);
      
      
      setStep(2);
      
    } catch (error) {
      console.error('Error:', error);
      toast.success(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Verify OTP
   

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    try {
      setLoading(true);
      const storedIdentifier = localStorage.getItem('resetIdentifier');
      
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmail = emailRegex.test(storedIdentifier);
      
      const requestData = {
        newPassword: newPassword,
        otp: otp,
        ...(isEmail 
          ? { email: storedIdentifier.toLowerCase().trim() }
          : { mobile: storedIdentifier.trim() }
        )
      };

      const response = await axios.post(
        'https://ecommerce-shop-qg3y.onrender.com/api/user/forgotPassword',
        requestData
      );

      if (response.data.success) {
        toast.success('Password reset successful! Please login with your new password.');
        localStorage.removeItem('resetIdentifier'); // Clean up
        navigate('/');
      } else {
        toast.error(response.data.message || 'Failed to reset password');
      }
    } catch (error) {
      if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        TouchList.error(error.response?.data?.message || 'Failed to reset password. Please try again.');
      }
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    setOtp(newOtpValues.join(''));

    if (value !== '' && index < 3) {
      const nextInput = document.querySelector(`input[name='otp-${index + 1}']`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.querySelector(`input[name='otp-${index - 1}']`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: 'url("https://cdn.prod.website-files.com/5ee0a01c741b15ab8ec28a14/65d625a7245d87ba6cd375a5__id%3D68.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
      <form onSubmit={step === 1 ? handleSendOTP : handleResetPassword} 
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        
        {step === 1 ? (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Enter Email or Mobile Number
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        ) : (
          <>
            <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-4 flex items-center"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <IoEyeSharp /> : <PiEyeSlashLight />}
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Confirm New Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-4 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <IoEyeSharp /> : <PiEyeSlashLight />}
          </button>
        </div>
      </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-[#b88e2f] text-white py-2 rounded-md hover:bg-[#a07d2a] transition-colors"
          disabled={loading}
        >
          {loading
            ? 'Processing...'
            : step === 1
            ? 'Change Password'
            : 'Reset Password'}
        </button>
        
        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full bg-gray-500 text-white py-2 rounded-md mt-2 hover:bg-gray-600 transition-colors"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
