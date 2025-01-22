import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/AppWrite";
const ProfilePage = () => {
  const { userDetails } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    const res = await logout();
    if (res) {
      console.log(res);
      setLoading(false);
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
            {userDetails?.name || userDetails.zooname}
          </Text>
        </View>
        {userDetails.Profile ? (
          <Image
            source={{ uri: userDetails.profile }}
            className="h-12 w-12 rounded-full"
          />
        ) : (
          <Image
            source={{ uri: userDetails.avatar }}
            className="h-12 w-12 rounded-full"
          />
        )}
      </View>

      <View className="mt-0 space-y-6 px-4">
        <TouchableOpacity
          className="flex-row items-center border-b-2  border-gray-300 h-15"
          onPress={() => router.push("../EditProfile")}
        >
          <MaterialIcons name="edit" size={24} color="gray" />
          <Text className="text-base">Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row justify-between items-center border-b-2 border-gray-300 h-15"
          onPress={handleLogout}
        >
          <View className="flex-row">
            <MaterialIcons name="logout" size={24} color="red" />
            <Text className="text-base text-red-600">Logout</Text>
          </View>
          {loading && <ActivityIndicator color={"#CE4B26"} size={25} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfilePage;
