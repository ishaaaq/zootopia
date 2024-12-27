import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FloatingActionButton = ({
  onPress,
  icon = "add",
  color = "white",
  backgroundColor = "blue",
  size = 24,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute bottom-6 right-6 rounded-full shadow-lg"
      style={{
        backgroundColor,
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default FloatingActionButton;
