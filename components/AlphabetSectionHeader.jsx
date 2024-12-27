import React from "react";
import { View, Text } from "react-native";

const AlphabetSectionHeader = ({ letter }) => {
  return (
    <View className="py-2 bg-gray-100 px-4 mb-2">
      <Text className="text-lg font-bold text-gray-700">{letter}</Text>
    </View>
  );
};

export default AlphabetSectionHeader;
