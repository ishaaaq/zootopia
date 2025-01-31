import { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { sendMessage, databases, config } from "@/lib/AppWrite";
import { useGlobalSearchParams } from "expo-router";
import { Query } from "react-native-appwrite";
import { useNavigation } from "@react-navigation/native";
import socket from "@/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatScreen = () => {
  const { conversationId, participantName, senderId } = useGlobalSearchParams(); // Passed when navigating to this screen
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesRef = useRef([]);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: participantName || "Chat",
    });
  }, [navigation, participantName]);

  useEffect(() => {
    const loadCachedMessages = async () => {
      const cachedMessages = await AsyncStorage.getItem(
        `chat_${conversationId}`
      );
      if (cachedMessages) {
        setMessages(JSON.parse(cachedMessages));
      }
    };

    loadCachedMessages();

    const fetchMessages = async () => {
      try {
        const response = await databases.listDocuments(
          config.database,
          config.message,
          [
            Query.equal("conversationId", conversationId),
            // Query.orderDesc("timestamp"),
          ]
        );
        messagesRef.current = response.documents; // Store messages in ref

        setMessages(response.documents);
        await AsyncStorage.setItem(
          `chat_${conversationId}`,
          JSON.stringify(response.documents)
        );
      } catch (error) {
        console.error("Error fetching messages:", error.message);
      }
    };

    fetchMessages();

    socket.on("receive_message", (data) => {
      messagesRef.current = [...messagesRef.current, data]; // Update ref first
      setMessages([...messagesRef.current]); // Then update state
    });

    return () => {
      socket.off("receive_message");
    };
  }, [conversationId]);

  const handleSend = async () => {
    // if (message.trim()) {
    //   const newMessage = await sendMessage(conversationId, senderId, message);
    //   setMessages((prevMessages) => [...prevMessages, newMessage]);
    //   socket.emit("send_message", newMessage);
    //   setMessage("");
    // }

    if (message.trim()) {
      const tempMessage = {
        $id: Date.now().toString(),
        message,
        senderId,
        conversationId,
      };
      setMessage("");
      setMessages((prev) => [...prev, tempMessage]); // Show message instantly

      socket.emit("send_message", tempMessage);

      await sendMessage(conversationId, senderId, message); // Send to Appwrite
    }
  };

  return (
    <View className="flex-1 bg-gray px-2">
      <FlatList
        data={messages}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text
            className={`${
              item.senderId === senderId
                ? "self-end bg-primary-500 text-white"
                : "self-start bg-primary-100"
            }  p-2 rounded-full my-1 max-w-3/4`}
          >
            {item.message}
          </Text>
        )}
        // inverted
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
