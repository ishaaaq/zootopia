import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const SpeciesFilter = ({ species, selectedSpecies, onSelectSpecies }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row mb-4"
    >
      {species.map((specie, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onSelectSpecies(specie)}
          className={`px-4 py-2 rounded-full mr-2 ${
            selectedSpecies === specie ? "bg-blue-500" : "bg-gray-200"
          }`}
        >
          <View className="flex-row items-center">
            <Text
              className={`${
                selectedSpecies === specie ? "text-white" : "text-gray-700"
              } text-sm font-semibold`}
            >
              {specie}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default SpeciesFilter;
