import React, { useState } from "react";
import { View, Text } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

export default function RangeSlider({
  min,
  max,
  steps,
  values,
  onValuesChange,
}) {
  return (
    <View className="items-center p-4">
      <Text className="text-lg font-bold mb-4">
        Min: {values[0]} | Max: {values[1]}
      </Text>
      <MultiSlider
        values={values}
        sliderLength={300}
        onValuesChange={onValuesChange} // Handle change
        min={min}
        max={max}
        step={steps}
        selectedStyle={{ backgroundColor: "#CE4B26" }}
        unselectedStyle={{ backgroundColor: "#d1d5db" }}
        markerStyle={{
          backgroundColor: "#CE4B26",
          height: 20,
          width: 20,
        }} // Thumb style
      />
    </View>
  );
}
