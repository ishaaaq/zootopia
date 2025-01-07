import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const SupplierHome = () => {
  const [animals, setAnimals] = useState([]); // Animal data
  const router = useRouter();

  // Placeholder function to add a new animal (for testing purposes)
  const addAnimal = () => {
    const newAnimal = {
      id: animals.length + 1,
      name: `Animal ${animals.length + 1}`,
      species: "Lion",
      age: `${Math.floor(Math.random() * 10) + 1} years`,
      image: "https://via.placeholder.com/150",
    };
    setAnimals([...animals, newAnimal]);
  };

  const renderAnimalCard = ({ item }) => (
    <View className="flex-row bg-gray-100 rounded-lg p-4 mb-4 items-center">
      <Image
        source={{ uri: item.image }}
        className="w-12 h-12 rounded-lg mr-4"
      />
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
        <Text className="text-sm text-gray-600">
          {item.species} - {item.age}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-6 py-4">
      <StatusBar backgroundColor="#61dafb" />
      <Text className="text-2xl text-gray-900 mb-6">Hello Seller</Text>
      <Text className="text-3xl font-bold text-gray-900 mb-6">My Animals</Text>

      {animals.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <Image
            source={require("@/assets/images/sadPup.jpg")} // Add a suitable placeholder image
            className="mb-6"
            style={{ width: 165, height: 165 }}
          />
          <Text className="text-lg text-gray-600 text-center mb-6">
            No animals found. Click the "Add Animal" button to add your first
            animal.
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
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListFooterComponent={
            <TouchableOpacity
              className="flex-row items-center justify-center bg-primary-300 rounded-lg px-6 py-3 mt-4"
              onPress={() => router.push("/add-animal")}
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
