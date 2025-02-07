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
import { useGlobalContext } from "@/lib/global-provider";
import { Switch } from "react-native";
const FilterModal = ({ isVisible, onClose, onApplyFilters }) => {
  const screenHeight = Dimensions.get("window").height;
  const { userDetails, isLoggedIn } = useGlobalContext();
  const [selectedType, setSelectedType] = useState(["All"]);
  const [exotic, setExotic] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [isApplyingFilters, setIsApplyingFilters] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => setIsChecked(!isChecked);

  const types = ["All", "domestic", "wild"];

  const toggleType = (type) => {
    if (type === "All") {
      setSelectedType(["All"]);
    } else {
      setSelectedType((prev) => {
        const updated = prev.includes(type)
          ? prev.filter((t) => t !== type) // Deselect the type
          : [...prev.filter((t) => t !== "All"), type]; // Select the type and deselect "All"

        // If no types are selected, default to "All"
        return updated.length === 0 ? ["All"] : updated;
      });
    }
  };

  const applyFilters = () => {
    setIsApplyingFilters(true);
    const filters = {
      type: selectedType.includes("All") ? "All" : selectedType, // If "All" is selected, send an empty array for no specific filter
      priceRange,
      exotic: isChecked,
    };

    setIsApplyingFilters(false);
    onClose();
    onApplyFilters(filters);
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        className="flex-1 justify-end  bg-black bg-opacity-50"
      >
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

          {/* Type */}
          {userDetails?.usertype == "zoo" ? (
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
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Text className="text-sm font-medium text-gray-500">
                Toggle exotic pets
              </Text>

              <Switch
                value={isChecked}
                onValueChange={toggleCheckbox}
                trackColor={{ false: "#d1d5db", true: "#CE4B26" }}
                thumbColor={isChecked ? "#CE4B26" : "#f4f4f5"}
              />
            </View>
          )}

          {/* Price Range */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-500">
              Price Range
            </Text>
            {/* <Text className="text-gray-700 mt-4">
              ${priceRange[0]} - ${priceRange[1]}
            </Text> */}
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
