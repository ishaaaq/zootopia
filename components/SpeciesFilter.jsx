import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const SpeciesFilter = ({ species, selectedSpecies, onSelectSpecies }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row mb-4 h-20"
    >
      {species?.map((specie, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onSelectSpecies(specie)}
          className={`px-4 py-2 rounded-lg mr-5 shadow-md shadow-black-100  w-15 h-15 ${
            selectedSpecies === specie ? "bg-primary" : "bg-gray-200"
          }`}
        >
          <MaterialCommunityIcons
            name="person"
            size={25}
            color={selectedSpecies === specie ? "white" : "primary"}
          />
          {/* <View className="flex-row items-center">
            <Text
              className={`${
                selectedSpecies === specie ? "text-white" : "text-gray-700"
              } text-sm font-semibold`}
            >
              {specie}
            </Text>
          </View> */}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default SpeciesFilter;
