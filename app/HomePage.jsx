import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import SearchBar from "@/components/SearchBar";
import SpeciesFilter from "@/components/SpeciesFilter";
import AlphabetSectionHeader from "@/components/AlphabetSectionHeader";
import Card from "@/components/Card";
import FloatingActionButton from "@/components/Fab";
import panda from "@/assets/images/panda.jpg";
import deer from "@/assets/images/animals/deer.jpg";
import ALPHABETS from "@/lib/data";
import { router } from "expo-router";
import AddAnimal from "./AddAnimal";
const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const species = ["All", "Mammals", "Birds", "Reptiles", "Amphibians", "Fish"];
  const animals = [
    { id: 1, name: "Alex", age: "1", species: "Birds", image: panda },
    { id: 2, name: "Bella", age: "2", species: "Mammals", image: deer },
    { id: 3, name: "Alex", age: "1", species: "Birds", image: panda },
    { id: 4, name: "Bella", age: "2", species: "Mammals", image: deer },
    { id: 5, name: "Alex", age: "1", species: "Birds", image: panda },
    { id: 6, name: "Bella", age: "2", species: "Mammals", image: deer },
    { id: 7, name: "Alex", age: "1", species: "Birds", image: panda },
    { id: 8, name: "Bella", age: "2", species: "Mammals", image: deer },
    { id: 9, name: "Alex", age: "1", species: "Birds", image: panda },
    { id: 10, name: "Bella", age: "2", species: "Mammals", image: deer },
    { id: 11, name: "Alex", age: "1", species: "Birds", image: panda },
    { id: 12, name: "Bella", age: "2", species: "Mammals", image: deer },
  ];

  const filteredAnimals = animals.filter((animal) => {
    const matchesSpecies =
      selectedSpecies === "All" || animal.species === selectedSpecies;
    const matchesSearchQuery = animal.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSpecies && matchesSearchQuery;
  });

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">My Animals</Text>

      <SearchBar
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <SpeciesFilter
        species={species}
        selectedSpecies={selectedSpecies}
        onSelectSpecies={(specie) =>
          setSelectedSpecies(selectedSpecies === specie ? null : specie)
        }
      />

      {ALPHABETS.map((letter) => {
        const animalsByLetter = filteredAnimals.filter((animal) =>
          animal.name.startsWith(letter)
        );

        if (animalsByLetter.length === 0) {
          return null;
        }

        return (
          <View key={letter}>
            <AlphabetSectionHeader letter={letter} />
            <View className="flex flex-row flex-wrap justify-center w-full">
              {animalsByLetter.length > 0 ? (
                animalsByLetter.map((animal) => (
                  <View key={animal.id} className="w-1/2">
                    <Card {...animal} />
                  </View>
                ))
              ) : (
                <Text className="text-gray-500 text-center">
                  No animals found
                </Text>
              )}
            </View>
          </View>
        );
      })}

      <FloatingActionButton onPress={router.push(AddAnimal)} />
    </ScrollView>
  );
};

export default HomePage;
