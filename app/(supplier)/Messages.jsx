import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { getConversations } from "@/lib/AppWrite";
import { useGlobalContext } from "@/lib/global-provider";
import { usePusher } from "../../lib/usePusher";
import { router } from "expo-router";
const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userDetails } = useGlobalContext();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const fetchedConversations = await getConversations();
        setConversations(fetchedConversations);
      } catch (error) {
        console.error("Error fetching conversations:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  usePusher("conversations", "new-message", (data) => {
    setConversations((prevConversations) =>
      prevConversations.map((conversation) =>
        conversation.$id === data.conversationId
          ? { ...conversation, lastMessage: data.message }
          : conversation
      )
    );
  });

  const openConversation = (conversationId, senderId) => {
    router.push({
      pathname: "/ChatScreen",
      params: { conversationId, senderId },
    });
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white p-4">
        <Text className="text-lg text-gray-500">Loading...</Text>
      </View>
    );
  }

  if (conversations.length === 0) {
    return (
      <View className="flex-1 bg-white p-4">
        <Text className="text-lg text-gray-500">No messages</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4">Messages</Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openConversation(item.$id, userDetails.$id)}
            className="flex-row justify-between p-4 bg-gray-100 mb-2 rounded"
          >
            <Text className="font-medium">
              {/* Display the participant's name */}
              {item.participants[1]}
            </Text>
            <Text className="text-sm text-gray-500">{item.lastMessage}</Text>
            <Text className="text-xs text-gray-400">{item.timestamp}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Messages;
