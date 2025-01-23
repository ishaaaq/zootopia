import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { client, config } from "@/lib/AppWrite";
import { useNotifications } from "@/lib/NotificationsContext";
const Notifications = () => {
  const { notifications, markAllAsRead, loading, error } = useNotifications();
  useEffect(() => {
    markAllAsRead();
  }, []);

  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${config.databases}.collections.${config.notifications}.documents`,
      (response) => {
        if (response.event === "database.documents.create") {
          setNotifications((prev) => [response.payload, ...prev]);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#CE4B26" />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View className="bg-white p-4 flex-1">
      <Text className="text-xl font-bold mb-4">Notifications</Text>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <TouchableOpacity className="p-4 bg-gray-100 mb-2 rounded">
              <Text className="font-medium">{item.content}</Text>
              <Text className="text-sm text-gray-500">{item.timestamp}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text className="text-gray-500">No notifications yet.</Text>
      )}
    </View>
  );
};

export default Notifications;
