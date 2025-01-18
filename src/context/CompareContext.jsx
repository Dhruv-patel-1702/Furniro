import React, { createContext, useState, useContext } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState([]);

  const addToCompare = (product) => {
    setCompareItems(prev => {
      if (prev.length >= 3) {
        return prev;
      }
      if (!prev.find(item => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromCompare = (productId) => {
    setCompareItems(prev => prev.filter(item => item.id !== productId));
  };

  return (
    <CompareContext.Provider value={{
      compareItems,
      addToCompare,
      removeFromCompare
    }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext); 