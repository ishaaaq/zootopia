import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({
  value,
  onChangeText,
  placeholder = "Search animals...",
}) => {
  return (
    <View className="flex-row items-center bg-gray-100 p-3 rounded-full mb-4 border border-gray-900">
      <Ionicons name="search" size={20} color="gray" className="mr-2" />
      <TextInput
        className="flex-1 text-gray-700 w-100 h-full outline-none"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="gray"
      />
    </View>
  );
};

export default SearchBar;
