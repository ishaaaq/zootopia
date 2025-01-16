import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import RangeSlider from "@/components/RangeSlider";

const FilterModal = ({ isVisible, onClose, onApplyFilters }) => {
  const screenHeight = Dimensions.get("window").height;

  // States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedType, setSelectedType] = useState(["Domestic", "Wild"]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [isApplyingFilters, setIsApplyingFilters] = useState(false);

  const categories = ["Dogs", "Cats", "Rabbits", "Horses", "Fish", "Birds"];
  const types = ["Domestic", "Wild"];

  // Toggle Category Selection
  const toggleCategory = (category) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category) // Remove if already selected
          : [...prev, category] // Add if not selected
    );
  };

  // Toggle Type Selection
  const toggleType = (type) => {
    setSelectedType(
      (prev) =>
        prev.includes(type) && prev.length > 1
          ? prev.filter((t) => t !== type) // Remove if already selected
          : [type] // Select only this type
    );
  };

  // Handle Apply Filters
  const applyFilters = async () => {
    setIsApplyingFilters(true);
    const filters = {
      categories: selectedCategories,
      type: selectedType,
      priceRange,
    };

    // Simulate filtering process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsApplyingFilters(false);
    onClose(); // Close the modal
    onApplyFilters(filters); // Pass the filters to parent component
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black bg-opacity-50">
        {/* Filter Content */}
        <View
          className="w-full bg-white rounded-t-xl p-4"
          style={{ height: screenHeight * 0.7 }}
        >
          {/* Close Button */}
          <TouchableOpacity className="self-end p-2" onPress={onClose}>
            <Text className="text-primary text-lg">Close</Text>
          </TouchableOpacity>

          {/* Filter Options */}
          <Text className="text-lg font-bold text-gray-700 mb-4">Filter</Text>

          {/* Categories */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-500">
              Categories
            </Text>
            <View className="flex-row flex-wrap mt-2">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => toggleCategory(category)}
                  className={`px-3 py-2 rounded-full m-1 ${
                    selectedCategories.includes(category)
                      ? "bg-primary"
                      : "bg-gray-200"
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      selectedCategories.includes(category)
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Type */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-500">Type</Text>
            <View className="flex-row flex-wrap mt-2">
              {types.map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => toggleType(type)}
                  className={`px-3 py-2 rounded-full m-1 ${
                    selectedType.includes(type) ? "bg-primary" : "bg-gray-200"
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      selectedType.includes(type)
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Price Range */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-500">
              Price Range
            </Text>
            <Text className="text-gray-700 mt-4">
              {"\u20A6"}
              {priceRange[0]} - {"\u20A6"}
              {priceRange[1]}
            </Text>
            <RangeSlider
              min={0}
              max={10000}
              step={50}
              values={priceRange}
              onValuesChange={(values) => setPriceRange(values)}
            />
          </View>

          {/* Apply Filters Button */}
          <TouchableOpacity
            onPress={applyFilters}
            className="bg-primary py-3 rounded-full mt-auto w-full"
            disabled={isApplyingFilters}
          >
            {isApplyingFilters ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-center text-lg">
                Apply Filters
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
