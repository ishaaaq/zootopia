import { useState, useEffect, useRef } from "react";
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

const ChatScreen = () => {
  const { conversationId, recieiverId, senderId } = useGlobalSearchParams(); // Passed when navigating to this screen
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  // const [ws, setWs] = useState(null);
  const ws = useRef(null);
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

    ws.current = new WebSocket("ws://localhost:8000");

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.current.onclose = (event) => {
      console.log("WebSocket connection closed", event);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    // const socket = new WebSocket("ws://localhost:8000");
    // setWs(socket);

    ws.current.onmessage = (event) => {
      console.log("WebSocket message event:", event);
      try {
        const newMessage = JSON.parse(event.data);
        console.log("Parsed message:", newMessage);
        if (newMessage.conversationId === conversationId) {
          setMessages((prev) => [...prev, newMessage]);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error.message);
      }
    };

    // return () => {
    //   socket.close();
    // };
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [conversationId]);

  const handleSend = async () => {
    if (message.trim() === "") return;

    try {
      // Save the message to Appwrite
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        const newMessage = await sendMessage(conversationId, senderId, message);

        // Send the message to WebSocket server
        // if (ws && ws.readyState === WebSocket.OPEN) {
        //   ws.send(JSON.stringify(newMessage));
        // } else {
        //   console.error("WebSocket is not open. ReadyState:", ws?.readyState);
        // }
        ws.current.send(JSON.stringify(newMessage));
        setMessage("");
      } else {
        console.error(
          "WebSocket is not open. ReadyState:",
          ws.current?.readyState
        );
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  return (
    <View className="flex-1 bg-gray px-2">
      <View></View>
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
