import React, { createContext, useContext, useState } from "react";
import { useAppwrite } from "./UseAppwrite";
import { fetchAnimalsForCurrentZoo } from "./AppWrite";
// Create the context
const ZooAnimalsContext = createContext();

// Custom provider
export const ZooAnimalsProvider = ({ children }) => {
  const {
    data: zooAnimals,
    error,
    loading,
    refetch,
  } = useAppwrite({
    fn: fetchAnimalsForCurrentZoo,
  });

  return (
    <ZooAnimalsContext.Provider value={{ zooAnimals, error, loading, refetch }}>
      {children}
    </ZooAnimalsContext.Provider>
  );
};

// Custom hook for using the context
export const useZooAnimals = () => {
  return useContext(ZooAnimalsContext);
};
