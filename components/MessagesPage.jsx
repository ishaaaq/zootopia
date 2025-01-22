import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { getConversations, getUserDetails } from "@/lib/AppWrite";
import { useGlobalContext } from "@/lib/global-provider";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const MessagesPage = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userDetails } = useGlobalContext();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const fetchedConversations = await getConversations(userDetails.$id);
        const resolvedConversations = await Promise.all(
          fetchedConversations.map(async (conversation) => {
            const otherParticipantId = conversation.participants.find(
              (id) => id !== userDetails.$id
            );

            const participantDetails = await getUserDetails(otherParticipantId);
            return {
              ...conversation,
              participantName:
                participantDetails.name || participantDetails.zooname,
              avatar: participantDetails.avatar,
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

  const openConversation = (conversationId, participantName, senderId) => {
    router.push({
      pathname: "/ChatScreen",
      params: { conversationId, participantName, senderId },
    });
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#CE4B26" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-3xl font-tc-bold mb-4">Messages</Text>
      {conversations.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <Image
            source={require("@/assets/images/noMessages.png")}
            className="mb-6"
            style={{ width: 165, height: 165 }}
          />
          <Text className="text-lg text-gray-600 text-center mb-6">
            No Messages found.
          </Text>
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                openConversation(
                  item.$id,
                  item.participantName,
                  userDetails.$id
                )
              }
              className="flex-row justify-between p-4 bg-gray-100 mb-2 rounded"
            >
              <View className="flex-row">
                {/* <Ionicons name="person" color="gray" size={35} /> */}
                <Image
                  source={{ uri: item.avatar }} // Replace with user profile image
                  className="h-12 w-12 rounded-full"
                />
                <Text className="font-medium text-xl my-auto ml-4">
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
      )}
    </View>
  );
};

export default MessagesPage;
