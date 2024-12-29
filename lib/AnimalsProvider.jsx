import React, { createContext, useContext, useState } from "react";
import panda from "@/assets/images/panda.jpg";
import deer from "@/assets/images/animals/deer.jpg";
// Create the context
const AnimalsContext = createContext();

// Custom provider
export const AnimalsProvider = ({ children }) => {
  // Initialize animals state
  const [animals, setAnimals] = useState([
    { id: 0, name: "Alex", age: "1", species: "Bird", image: panda },
    { id: 1, name: "Alex", age: "1", species: "Bird", image: panda },
    { id: 2, name: "Bella", age: "2", species: "Mammal", image: deer },
    { id: 3, name: "Alex", age: "1", species: "Bird", image: panda },
    { id: 4, name: "Bella", age: "2", species: "Mammal", image: deer },
    { id: 5, name: "Alex", age: "1", species: "Bird", image: panda },
    { id: 6, name: "Bella", age: "2", species: "Mammal", image: deer },
    { id: 7, name: "Alex", age: "1", species: "Bird", image: panda },
    { id: 8, name: "Bella", age: "2", species: "Mammal", image: deer },
    { id: 9, name: "Alex", age: "1", species: "Bird", image: panda },
    { id: 10, name: "Bella", age: "2", species: "Mammal", image: deer },
    { id: 11, name: "Alex", age: "1", species: "Bird", image: panda },
    { id: 12, name: "Bella", age: "2", species: "Mammal", image: deer },
  ]);

  // Add animal
  const addAnimal = (newAnimal) => {
    setAnimals((prev) => [...prev, newAnimal]);
  };

  // Update animal
  const updateAnimal = (updatedAnimal) => {
    setAnimals((prev) =>
      prev.map((animal) =>
        animal.id === updatedAnimal.id ? updatedAnimal : animal
      )
    );
  };

  // Delete animal
  const deleteAnimal = (id) => {
    setAnimals((prev) => prev.filter((animal) => animal.id !== id));
  };

  return (
    <AnimalsContext.Provider
      value={{ animals, addAnimal, updateAnimal, deleteAnimal }}
    >
      {children}
    </AnimalsContext.Provider>
  );
};

// Custom hook for using the context
export const useAnimals = () => {
  return useContext(AnimalsContext);
};
