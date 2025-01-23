import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useGlobalContext } from "@/lib/global-provider";
import icons from "@/constants/icons";
import { router } from "expo-router";
import { useNotifications } from "@/lib/NotificationsContext";
const BellWithBadge = () => {
  const { notifications } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <TouchableOpacity
      onPress={() => router.push("/Notifications")}
      className="bg-white relative p-2 flex items-center justify-center shadow-md shadow-black-100 rounded-xl w-12 h-12"
    >
      <Image
        source={icons.bell}
        resizeMode="contain"
        style={{ width: 25, height: 25 }}
      />
      {/* Badge */}
      {unreadCount > 0 && (
        <View className="absolute top-0 right-0 bg-red-500 rounded-full w-5 h-5 flex justify-center items-center">
          <Text className="text-white text-xs font-bold">{unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default BellWithBadge;
