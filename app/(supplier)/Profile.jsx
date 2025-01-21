import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/AppWrite";
const Profile = () => {
  const { userDetails } = useGlobalContext();

  const handleLogout = async () => {
    const res = await logout();
    if (res) {
      console.log(res);
      return router.replace("../auth/Login");
    }
  };
  return (
    <View className="flex-1 bg-white ">
      {/* Profile Header */}
      <View className="flex-row items-center justify-between mt-8 bg-gray-200 p-4">
        <View className="flex-col">
          <Text className="text-2xl font-tc-bold text-black">Profile</Text>
          <Text className="text-xl font-tc text-gray-600">
            {userDetails?.name}
          </Text>
        </View>
        <Image
          source={{ uri: "https://via.placeholder.com/50" }} // Replace with user profile image
          className="h-12 w-12 rounded-full"
        />
      </View>

      <View className="mt-8 space-y-6 px-4">
        <TouchableOpacity
          className="flex-row items-center space-x-4"
          onPress={() => router.push("../EditProfile")}
        >
          <MaterialIcons name="edit" size={24} color="gray" />
          <Text className="text-base">Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center space-x-4"
          onPress={() => router.push("../AccountDetails")}
        >
          <Ionicons name="wallet" size={24} color="gray" />
          <Text className="text-base">Bank Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center space-x-4"
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={24} color="red" />
          <Text className="text-base text-red-600">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
