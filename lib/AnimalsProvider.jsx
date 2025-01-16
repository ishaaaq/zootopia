import React, { createContext, useContext, useState } from "react";
import { useAppwrite } from "./UseAppwrite";
import { fetchAllAnimals } from "./AppWrite";
// Create the context
const AnimalsContext = createContext();

// Custom provider
export const AnimalsProvider = ({ children }) => {
  const {
    data: animalsData,
    error,
    loading,
    refetch,
  } = useAppwrite({
    fn: fetchAllAnimals,
  });

  return (
    <AnimalsContext.Provider value={{ animalsData, error, loading, refetch }}>
      {children}
    </AnimalsContext.Provider>
  );
};

// Custom hook for using the context
export const useAnimals = () => {
  return useContext(AnimalsContext);
};
