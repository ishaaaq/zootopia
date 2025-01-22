import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useZoos } from "@/lib/ZoosProvider"; // Zoos context

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { zoos } = useZoos(); // Fetch zoos from context
  const router = useRouter();

  const filteredZoos = zoos.filter((zoo) =>
    zoo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Explore Zoos</Text>

      {/* Search Bar */}
      <TextInput
        placeholder="Search zoos..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        className="bg-gray-200 p-3 rounded-full mb-4"
      />

      {/* Zoo List */}
      <FlatList
        data={filteredZoos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/zoo-details/${item.id}`)}
            className="p-4 bg-gray-100 mb-3 rounded-lg"
          >
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="text-gray-600">{item.location}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Explore;
