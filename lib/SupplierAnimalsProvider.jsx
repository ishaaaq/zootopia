import React, { createContext, useContext, useState } from "react";
import { useAppwrite } from "./UseAppwrite";
import { fetchAnimalsForCurrentUser } from "./AppWrite";
// Create the context
const SupplierAnimalsContext = createContext();

// Custom provider
export const SupplierAnimalsProvider = ({ children }) => {
  const {
    data: supplierAnimals,
    error,
    loading,
    refetch,
  } = useAppwrite({
    fn: fetchAnimalsForCurrentUser,
  });

  return (
    <SupplierAnimalsContext.Provider
      value={{ supplierAnimals, error, loading, refetch }}
    >
      {children}
    </SupplierAnimalsContext.Provider>
  );
};

// Custom hook for using the context
export const useSupplierAnimals = () => {
  return useContext(SupplierAnimalsContext);
};
