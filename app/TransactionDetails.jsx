import React, { useEffect, useState } from "react";
import { useRouter, useGlobalSearchParams } from "expo-router"; // For navigation and dynamic params
import { View, Text, ActivityIndicator } from "react-native";
import { databases, config } from "@/lib/AppWrite"; // Import your Appwrite configuration

const TransactionDetails = () => {
  const { id } = useGlobalSearchParams(); // Get the transaction ID from the URL
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch transaction details
  const fetchTransactionDetails = async () => {
    try {
      const response = await databases.getDocument(
        config.database,
        config.transaction, // Replace with your `transactions` collection ID
        id
      );
      setTransaction(response);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionDetails();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!transaction) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Transaction not found.</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 px-4 py-2 bg-blue-500 rounded-lg"
        >
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold mb-4">Transaction Details</Text>
      <View className="p-4 bg-gray-100 rounded-lg">
        <Text className="font-bold">Transaction ID:</Text>
        <Text className="mb-2">{transaction.$id}</Text>
        <Text className="font-bold">Amount:</Text>
        <Text className="mb-2">
          {`Amount: ${transaction.amount / 100} USD`}
        </Text>
        <Text className="font-bold">Product:</Text>
        <Text className="mb-2">{transaction.productName}</Text>
        <Text className="font-bold">Quantity:</Text>
        <Text className="mb-2">{transaction.productQuantity}</Text>
        <Text className="font-bold">Buyer:</Text>
        <Text className="mb-2">{transaction.buyerId}</Text>
        <Text className="font-bold">Seller:</Text>
        <Text className="mb-2">{transaction.sellerId}</Text>
        <Text className="font-bold">Date:</Text>
        <Text className="mb-2">
          {new Date(transaction.paymentDate).toLocaleString()}
        </Text>
        <Text className="font-bold">Status:</Text>
        <Text className="mb-2">{transaction.paymentStatus}</Text>
      </View>
    </View>
  );
};

export default TransactionDetails;
