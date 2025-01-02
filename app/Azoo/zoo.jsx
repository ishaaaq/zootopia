import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useZoos } from "@/lib/ZoosProvider";

const ZooDetailsPage = () => {
  const { id } = useLocalSearchParams(); // Get zoo ID
  const { zoos } = useZoos();
  const zoo = zoos.find((zoo) => zoo.id === id);

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">{zoo.name}</Text>
      <Text className="text-gray-600 mb-4">{zoo.location}</Text>

      {/* Animal List */}
      <FlatList
        data={zoo.animals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="p-4 bg-gray-100 mb-3 rounded-lg">
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="text-gray-600">{item.species}</Text>
            <TouchableOpacity
              onPress={() =>
                router.push(`/propose-exchange/${zoo.id}/${item.id}`)
              }
              className="bg-blue-500 p-3 rounded-full mt-2"
            >
              <Text className="text-white text-center">Propose Exchange</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default ZooDetailsPage;
