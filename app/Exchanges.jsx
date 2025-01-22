import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const Exchanges = () => {
  const [selectedTab, setSelectedTab] = useState("Pending");
  const exchanges = {
    Pending: [{ id: 1, details: "Exchange 1" }],
    Approved: [{ id: 2, details: "Exchange 2" }],
    Rejected: [],
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Exchanges</Text>

      {/* Tabs */}
      <View className="flex-row mb-4">
        {["Pending", "Approved", "Rejected"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            className={`flex-1 p-3 rounded-lg ${
              selectedTab === tab ? "bg-blue-500" : "bg-gray-200"
            }`}
          >
            <Text
              className={`text-center ${
                selectedTab === tab ? "text-white" : "text-black"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Exchange List */}
      <FlatList
        data={exchanges[selectedTab]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="p-4 bg-gray-100 mb-3 rounded-lg">
            <Text>{item.details}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Exchanges;
