import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const CategoriesFilter = ({
  Categories,
  selectedCategories,
  onSelectCategories,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row mb-4 h-20"
    >
      {Categories?.map((category, index) => (
        <View className="flex-col ">
          <TouchableOpacity
            key={index}
            onPress={() => onSelectCategories(category.name)}
            className={` flex justify-center items-center rounded-lg mr-5 shadow-md shadow-black-100  w-15 h-15 ${
              selectedCategories === category.name
                ? "bg-primary"
                : "bg-gray-200"
            }`}
          >
            <Text className="text-3xl mr-1"> {category.emoji}</Text>
          </TouchableOpacity>
          <Text className="font-tc-bold text-center mt-1 mr-5">
            {category.name}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default CategoriesFilter;
