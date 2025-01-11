import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const SelectUserType = () => {
  const [selectedUserType, setSelectedUserType] = useState("");

  const handleUserTypeSelection = (userType) => {
    setSelectedUserType(userType);
  };

  const handleContinue = () => {
    router.push(`/auth/signup/${selectedUserType}`);
  };

  return (
    <View className="flex-1 justify-center items-center p-5">
      <View className="flex flex-col items-center mb-6">
        <Text className="text-2xl font-bold">Select User Type</Text>
        <Text className="font-light text-gray-500">
          This helps us customize your experience
        </Text>
      </View>

      <View className="space-y-4 w-full">
        {["Zoo", "PetBuyer", "Supplier"].map((userType) => (
          <TouchableOpacity
            key={userType}
            onPress={() => handleUserTypeSelection(userType)}
            style={{
              backgroundColor:
                selectedUserType === userType ? "#4CAF50" : "#E0E0E0",
              padding: 20,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text className="text-xl font-semibold">
              {userType === "Zoo"
                ? "Zoo"
                : userType === "PetBuyer"
                ? "Pet Buyer"
                : "Supplier"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={handleContinue}
        disabled={!selectedUserType}
        className={`mt-6 p-3 rounded-full h-15 flex justify-center w-full ${
          selectedUserType ? "bg-primary-500" : "bg-primary-200"
        }`}
      >
        <Text className="text-white text-center">Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectUserType;
