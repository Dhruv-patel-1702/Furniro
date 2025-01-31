import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Shop from "./pages/shop";
import Contact from "./pages/Contact";
import Footer from "./Components/footer";
import SingleProduct from "./Components/SingleProduct";
import { CartProvider } from "./context/CartContext";
import ProductComparison from "./Components/ProductComparison";
import { CompareProvider } from "./context/CompareContext";
import Cart from "./Components/cart";
import Checkout from "./pages/checkout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Profile from "./Components/profile";
import ForgotPassword from "./auth/ForgotPassword";
import MyAddress from "./Components/myAddress";
import Order from "./pages/Order";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyOrders from './pages/MyOrders';


function App() {
  return (
    <CartProvider>
      <CompareProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/compare" element={<ProductComparison />} />
            <Route path="/singleproduct" element={<SingleProduct />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/shop" element={<Shop />} /> 
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/myAddress" element={<MyAddress />} />
            <Route path="/order" element={<Order />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        <ToastContainer />
      </CompareProvider>
    </CartProvider>
  );
}

export default App;
