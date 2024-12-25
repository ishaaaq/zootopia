import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "@/components/CustomButton";

const SelectUserType = () => {
  const [selectedUserType, setSelectedUserType] = useState<string>(''); // State to track the selected user type
  const navigation = useNavigation();


  const handleUserTypeSelection = (userType: string) => {
    setSelectedUserType(userType);
  };


  const handleContinue = () => {
    if (selectedUserType === "Zoo") {
      navigation.navigate("ZooSignUp"); 
    } else if (selectedUserType === "PetBuyer") {
      navigation.navigate("PetBuyerSignup"); 
    }  else if (selectedUserType === "PetSupplier") {
    navigation.navigate("PetSupplierSignup"); 
  }
    else {
      console.log("No user type selected");
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-5">
   <View className="flex flex-col items-center mb-6">

      <Text className="text-2xl font-bold">Select User Type</Text>
<Text className="font-light text-gray-500">This helps customize your experience</Text>
   </View>
   
      <View className="space-y-4 w-full">
        {["Zoo", "PetBuyer", "PetSupplier"].map((userType) => (
          <TouchableOpacity
            key={userType}
            onPress={() => handleUserTypeSelection(userType)}
            style={{
              backgroundColor: selectedUserType === userType ? "#4CAF50" : "#E0E0E0", 
              padding: 20,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text className="text-xl font-semibold">
              {userType === "Zoo" ? "Zoo" : userType === "PetBuyer" ? "Pet Buyer" : "Pet Supplier"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>


      <TouchableOpacity
        onPress={handleContinue}
        disabled={!selectedUserType}
        className={`mt-6 p-3 rounded-full h-15 flex justify-center w-full ${
          selectedUserType ? "bg-blue-500" : "bg-gray-400"
        }`}
      >
        <Text className="text-white text-center">Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectUserType;
