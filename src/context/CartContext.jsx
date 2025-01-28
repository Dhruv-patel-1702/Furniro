import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      let price;
      if (typeof item.price === 'string') {
        price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
      } else {
        price = item.price;
      }
      return total + (price * (item.quantity || 1));
    }, 0);
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const newItem = {
        ...product,
        cartId: Date.now(),
        quantity: product.quantity || 1
      };
      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? {...item, quantity} : item
      )
    );
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      isCartOpen,
      setIsCartOpen,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext; 