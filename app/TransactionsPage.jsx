import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router"; // Expo Router for navigation
import { fetchTransactions } from "@/lib/AppWrite"; // Import your Appwrite configuration
import { useGlobalContext } from "@/lib/global-provider";

const TransactionsPage = () => {
  const { userDetails } = useGlobalContext();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const transactions = await fetchTransactions(userDetails.$id);
      setTransactions(transactions);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#CE4B26" />
      </View>
    );
  }
  const renderTransactionCard = ({ item }) => (
    <TouchableOpacity
      className="p-4 mb-4 bg-gray-100 rounded-lg"
      onPress={() =>
        router.push({
          pathname: "/TransactionDetails",
          params: { id: item.$id },
        })
      } // Expo Router navigation
    >
      <Text className="font-bold text-lg text-gray-800">
        Transaction ID: {item.$id}
      </Text>
      <Text className="text-sm  text-gray-600">{`Amount: ${
        item.amount / 100
      } USD`}</Text>
      <Text className="text-sm  text-gray-600">
        {userDetails.usertype !== "supplier" ? "Purchased From" : "Sold To"}:{" "}
        {userDetails.usertype !== "supplier" ? item.sellerId : item.buyerId}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-4">
      <Text className="text-3xl font-tc-bold mb-4">Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.$id}
        renderItem={renderTransactionCard}
        ListEmptyComponent={
          <Text className="text-gray-500 text-center mt-10">
            No transactions found.
          </Text>
        }
      />
    </View>
  );
};

export default TransactionsPage;
