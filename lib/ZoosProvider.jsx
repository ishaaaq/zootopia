import React, { createContext, useContext, useState } from "react";

// Sample data for zoos
const initialZoos = [
  {
    id: "1",
    name: "Lagos Zoo",
    location: "Lagos, Nigeria",
    animals: [
      { id: "1", name: "Lion", species: "Mammal" },
      { id: "2", name: "Parrot", species: "Bird" },
    ],
  },
  {
    id: "2",
    name: "Abuja Zoo",
    location: "Abuja, Nigeria",
    animals: [
      { id: "3", name: "Crocodile", species: "Reptile" },
      { id: "4", name: "Elephant", species: "Mammal" },
    ],
  },
];

const ZoosContext = createContext();

export const ZoosProvider = ({ children }) => {
  const [zoos, setZoos] = useState(initialZoos);

  const addZoo = (newZoo) => {
    setZoos((prevZoos) => [...prevZoos, newZoo]);
  };

  const updateZoo = (id, updatedData) => {
    setZoos((prevZoos) =>
      prevZoos.map((zoo) => (zoo.id === id ? { ...zoo, ...updatedData } : zoo))
    );
  };

  const deleteZoo = (id) => {
    setZoos((prevZoos) => prevZoos.filter((zoo) => zoo.id !== id));
  };

  return (
    <ZoosContext.Provider value={{ zoos, addZoo, updateZoo, deleteZoo }}>
      {children}
    </ZoosContext.Provider>
  );
};

export const useZoos = () => {
  return useContext(ZoosContext);
};
