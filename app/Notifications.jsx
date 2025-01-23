import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { getNotifications, markNotificationAsRead } from "@/lib/AppWrite";
import { useGlobalContext } from "@/lib/global-provider";
import { client, config, databases } from "@/lib/AppWrite";
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { userDetails } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications(userDetails.$id);
        setNotifications(data);
        // Mark all notifications as read
        await Promise.all(
          data.map(async (element) => {
            await markNotificationAsRead(element.$id);
          })
        );

        // Trigger refetch
        setRefetchTrigger((prev) => !prev);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
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

  useEffect(() => {
    const refetchNotifications = async () => {
      try {
        const data = await getNotifications(userDetails.$id);
        setNotifications(data);
      } catch (error) {
        setError(error);
      }
    };

    if (refetchTrigger) {
      refetchNotifications();
    }
  }, [refetchTrigger, userDetails.$id]);

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
