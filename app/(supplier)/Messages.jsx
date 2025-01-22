import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { getConversations, getUserDetails } from "@/lib/AppWrite";
import { useGlobalContext } from "@/lib/global-provider";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userDetails } = useGlobalContext();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const fetchedConversations = await getConversations();
        const resolvedConversations = await Promise.all(
          fetchedConversations.map(async (conversation) => {
            const otherParticipantId = conversation.participants.find(
              (id) => id !== userDetails.$id // Exclude current user ID
            );

            const participantDetails = await getUserDetails(otherParticipantId);
            return {
              ...conversation,
              participantName: participantDetails.zooname || "Unknown User",
            };
          })
        );
        setConversations(resolvedConversations);
      } catch (error) {
        console.error("Error fetching conversations:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const openConversation = (conversationId, senderId) => {
    router.push({
      pathname: "/ChatScreen",
      params: { conversationId, senderId },
    });
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#CE4B26" />
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
      <Text className="text-xl tc-bold mb-4">Messages</Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openConversation(item.$id, userDetails.$id)}
            className="flex-row justify-between p-4 bg-gray-100 mb-2 rounded"
          >
            <View className="flex-row">
              <Ionicons name="person" color="gray" size={35} />
              <Text className="font-medium text-xl my-auto ml-4">
                {/* Display the participant's name */}
                {item.participantName}
              </Text>
            </View>
            <Text className="text-sm text-gray-500">{item.lastMessage}</Text>
            <Text className="text-xs text-gray-400">
              {new Date(item.timestamp).toISOString()}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Messages;
