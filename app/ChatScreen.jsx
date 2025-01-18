import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { sendMessage, databases, config } from "@/lib/AppWrite";
import { useGlobalSearchParams } from "expo-router";
import { triggerPusherEvent } from "../lib/pusher";
import { Query } from "react-native-appwrite";
import { usePusher } from "../lib/usePusher";
const ChatScreen = () => {
  const { conversationId, recieiverId, senderId } = useGlobalSearchParams(); // Passed when navigating to this screen
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      try {
        const response = await databases.listDocuments(
          config.database,
          config.message,
          [Query.equal("conversationId", conversationId)]
        );
        setMessages(response.documents);
      } catch (error) {
        console.error("Error fetching messages:", error.message);
      }
    };

    fetchMessages();
  }, [conversationId]);

  usePusher(`conversation-${conversationId}`, "new-message", (data) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  });

  const handleSend = async () => {
    if (message.trim() === "") return;

    try {
      // Save the message to Appwrite
      const newMessage = await sendMessage(conversationId, senderId, message);

      // Trigger Pusher event for real-time updates
      await triggerPusherEvent(
        `conversation-${conversationId}`,
        "new-message",
        newMessage
      );

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View></View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text
            className={`${
              item.senderId === senderId ? "text-right" : "text-left"
            } bg-primary-100 p-2 rounded my-1 w-auto`}
          >
            {item.message}
          </Text>
        )}
      />
      <View className="flex-row items-center p-4">
        <TextInput
          className="flex-1 border border-gray-300 rounded p-2"
          placeholder="Type your message"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          onPress={handleSend}
          className="ml-2 bg-primary-500 p-2 rounded"
        >
          <Text className="text-white">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
