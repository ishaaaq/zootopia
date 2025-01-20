import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

const FormButton = ({ title, loading, onPress, style = "" }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`bg-primary-500 p-3 rounded-full h-15 flex justify-center ${style}`} // default style and custom styles
  >
    {loading ? (
      <ActivityIndicator color={"white"} size={"small"} />
    ) : (
      <Text className="text-white text-center text-lg">{title}</Text>
    )}
  </TouchableOpacity>
);

export default FormButton;
