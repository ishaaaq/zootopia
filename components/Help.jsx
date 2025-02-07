import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import icons from "@/constants/icons";
import { router } from "expo-router";
const Help = () => {
  return (
    <TouchableOpacity
      onPress={() => router.push("/Report")}
      className="bg-white relative p-2 flex items-center justify-center shadow-md shadow-black-100 rounded-xl w-12 h-12"
    >
      <Image
        source={icons.info}
        resizeMode="contain"
        style={{ width: 25, height: 25 }}
      />
    </TouchableOpacity>
  );
};

export default Help;
