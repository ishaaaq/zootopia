import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { InputField } from "../components/NewInput";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const EditProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <View className="flex-1 bg-white px-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mt-8">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-base font-semibold text-gray-700">
            {"< Back"}
          </Text>
        </TouchableOpacity>
        <Text className="text-xl font-semibold">Edit Profile</Text>
        <View />
      </View>

      {/* Profile Picture */}
      <View className="items-center mt-8">
        <Image
          source={{ uri: "https://via.placeholder.com/100" }} // Replace with user profile image
          className="h-20 w-20 rounded-full"
        />
        <TouchableOpacity className="absolute bottom-0 right-32">
          <MaterialCommunityIcons name="camera" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View className="mt-8 space-y-4">
        <InputField
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
        <InputField
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        <InputField
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
      </View>

      {/* Update Button */}
      <TouchableOpacity
        onPress={() => console.log("Update pressed")}
        className="mt-8 bg-primary-600 py-3 rounded-md items-center"
      >
        <Text className="text-white text-base font-semibold">Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfilePage;
