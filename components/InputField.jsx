import React from "react";
import { TextInput, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const InputField = ({
  name,
  title,
  placeholder,
  value,
  onChangeText,
  onBlur,
  errorMessage,
  keyboardType = "default",
  secureTextEntry = false,
  togglePassword,
}) => (
  <View className="mb-4">
    <Text className="text-gray-700 font-bold mb-2">{title}</Text>
    <View className="relative">
      <TextInput
        className="border border-gray-400 p-2 rounded-full h-15 bg-white"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
      {togglePassword && (
        <TouchableOpacity
          onPress={togglePassword}
          className="absolute right-4 top-5"
        >
          <Ionicons
            name={secureTextEntry ? "eye-off" : "eye"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      )}
    </View>
    {errorMessage && <Text className="text-red-500">{errorMessage}</Text>}
  </View>
);

export default InputField;
