import React from "react";
import { TouchableOpacity, Text } from "react-native";

const FormButton = ({ title, onPress, style = "" }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`bg-blue-500 p-3 rounded-full h-15 flex justify-center ${style}`} // default style and custom styles
  >
    <Text className="text-white text-center text-lg">{title}</Text>
  </TouchableOpacity>
);

export default FormButton;
