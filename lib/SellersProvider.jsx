import React, { createContext, useContext } from "react";
import sellers from "./data";

const SellersContext = createContext();

// Create a Provider Component
export const SellersProvider = ({ children }) => {
  return (
    <SellersContext.Provider value={sellers}>
      {children}
    </SellersContext.Provider>
  );
};

// Create a custom hook to use the Sellers Context
export const useSellers = () => {
  const context = useContext(SellersContext);
  if (!context) {
    throw new Error("useSellers must be used within a SellersProvider");
  }
  return context;
};
