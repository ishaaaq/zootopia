import React, { useState } from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
// import { styled } from "nativewind";

// const StyledSlider = styled(Slider);

export default function RangleSlider() {
  const [value, setValue] = useState(50);

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-lg font-bold mb-4">
        {"\u20A6"} {value}
      </Text>
      <Slider
        style={{ width: 300, height: 40 }}
        minimumValue={100}
        maximumValue={10000}
        step={1}
        minimumTrackTintColor="#CE4B26" // Tailwind's gray-800
        maximumTrackTintColor="#d1d5db" // Tailwind's gray-300
        thumbTintColor="#CE4B26" // Tailwind's blue-500
        value={value}
        onValueChange={(newValue) => setValue(newValue)}
      />
    </View>
  );
}
