import React from "react";
import { View, Text, TouchableOpacity, Modal, Dimensions } from "react-native";

const FilterModal = ({ isVisible, onClose }) => {
  const screenHeight = Dimensions.get("window").height;

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

          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-500">
              Categories
            </Text>
            <View className="flex-row flex-wrap mt-2">
              {["Dogs", "Cats", "Rabbits", "Horses", "Fish", "Birds"].map(
                (category) => (
                  <TouchableOpacity
                    key={category}
                    className="bg-primary px-3 py-2 rounded-full m-1"
                  >
                    <Text className="text-white text-sm">{category}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-500">
              Price Range
            </Text>
            <Text className="text-gray-700 mt-4">$0 - $5000</Text>
          </View>

          {/* Apply Filters Button */}
          <TouchableOpacity className="bg-primary py-3 rounded-full mt-auto w-full">
            <Text className="text-white text-center text-lg">
              Apply Filters
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
