import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSupplierAnimals } from "@/lib/SupplierAnimalsProvider";
import { useGlobalContext } from "@/lib/global-provider";
import { fetchAnimalsForCurrentUser } from "@/lib/AppWrite";
const SupplierHome = () => {
  const router = useRouter();
  const { userDetails } = useGlobalContext();
  const [animals, setAnimals] = useState([]);
  // const [loading, setLoading] = useState(false);
  const { supplierAnimals, loading, error, refetch } = useSupplierAnimals();

  useEffect(() => {
    if (supplierAnimals) {
      setAnimals(supplierAnimals);
    }
  }, [supplierAnimals]);

  // useEffect(() => {
  //   const fetchAnimals = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetchAnimalsForCurrentUser();
  //       setAnimals(response);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchAnimals();
  // }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#CE4B26" />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const renderAnimalCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/MyAnimalDetails?animalId=${item.$id}`)}
      className="flex-row bg-gray-100 rounded-lg p-2 mb-4 items-center"
    >
      <Image
        source={{ uri: item.image }}
        className="w-15 h-15 rounded-lg mr-4"
      />
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
        <Text className="text-sm text-gray-600">
          {item.category} - {item.quantity}
        </Text>
        <Text className="text-lg font-bold text-primary-800">{`N${item.price}`}</Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push(`/EditAnimal?animalId=${item.$id}`)}
      >
        <Ionicons name="create-outline" size={30} color="grey" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-6 py-4">
      <StatusBar backgroundColor="#CE4B26" />
      <Text className="text-2xl text-gray-900 mb-6">{`Hello ${
        userDetails ? userDetails.name : "Seller"
      }`}</Text>
      <Text className="text-3xl font-bold text-gray-900 mb-6">My Animals</Text>

      {supplierAnimals.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <Image
            source={require("@/assets/images/sadPup.jpg")}
            className="mb-6"
            style={{ width: 165, height: 165 }}
          />
          <Text className="text-lg text-gray-600 text-center mb-6">
            No animals found. Click the "Add Animal" button to add your first
            animal to the marketplace.
          </Text>
          <TouchableOpacity
            className="flex-row items-center justify-center bg-primary-300 rounded-lg px-6 py-3"
            onPress={() => router.push("../AddAnimal")}
          >
            <Ionicons name="add-circle" size={24} color="#fff" />
            <Text className="text-white text-lg font-semibold ml-2">
              Add Animal
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={animals}
          renderItem={renderAnimalCard}
          keyExtractor={(item) => item.$id}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListFooterComponent={
            <TouchableOpacity
              className="flex-row items-center justify-center bg-primary-300 rounded-lg px-6 py-3 mt-4"
              onPress={() => router.push("../AddAnimal")}
            >
              <Ionicons name="add-circle" size={24} color="#fff" />
              <Text className="text-white text-lg font-semibold ml-2">
                Add Another Animal
              </Text>
            </TouchableOpacity>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default SupplierHome;
