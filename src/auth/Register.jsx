import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ecommerce-shop-qg3y.onrender.com/api/user/register', formData);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen" 
      style={{ 
        backgroundImage: 'url("https://cdn.prod.website-files.com/5ee0a01c741b15ab8ec28a14/65d625a7245d87ba6cd375a5__id%3D68.webp")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          onChange={handleChange} 
          required 
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          required 
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        />
        <input 
          type="text" 
          name="mobile" 
          placeholder="Mobile" 
          onChange={handleChange} 
          required 
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        />
        <input 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm Password" 
          onChange={handleChange} 
          required 
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        />
        <select 
          name="gender" 
          onChange={handleChange} 
          required 
          className="border border-gray-300 p-2 mb-4 w-full rounded"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button 
          type="submit" 
          className=" bg-[#e9c062] text-white p-2 rounded w-full mb-2 hover:bg-[#b88e2f]"
        >
          Register
        </button>
        <button 
          type="button" 
          onClick={() => navigate('/')} 
          className="bg-gray-500 text-white p-2 rounded w-full hover:bg-gray-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Register;
