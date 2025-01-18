import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Shop from './pages/shop';
import Contact from './pages/Contact';
import Footer from './Components/footer';
import SingleProduct from './Components/SingleProduct';
import { CartProvider } from './context/CartContext';
import ProductComparison from './Components/ProductComparison';
import { CompareProvider } from './context/CompareContext';
import Cart from './Components/cart';
import Checkout from './pages/checkout';

function App() {
  return (
    <CartProvider>
      <CompareProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>  
            <Route path="/" element={<Home/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/blog" element={<Blog/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/compare" element={<ProductComparison/>}/>
            <Route 
              path="/singleproduct" 
              element={<SingleProduct/>}
            />
            <Route path="*" element={<Navigate to="/shop" replace />} />
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </CompareProvider>
    </CartProvider>
  );
}

export default App;