import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAnimals } from "@/lib/AnimalsProvider";

const AnimalDetails = ({ route }) => {
  const router = useRouter();
  const { animals } = useAnimals();
  const { id } = useLocalSearchParams(); // Get the animal ID

  const animal = animals.find((animal) => animal.id === Number(id));

  useEffect(() => {
    console.log("Animal ID:", id, "Animal:", animal);
  }, [id, animal]);

  const handleDelete = () => {
    Alert.alert(
      "Delete Animal",
      `Are you sure you want to delete ${animal.name} from your zoo?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Delete logic here
            console.log("Animal deleted");
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-white p-4">
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <Ionicons name="arrow-back" size={24} color="blue" />
      </TouchableOpacity>

      {/* Image */}
      <Image
        source={animal.image}
        className="w-full h-64 rounded mb-4"
        style={{ borderRadius: 10, height: 400 }}
        resizeMode="cover"
      />

      {/* Animal Details */}
      <Text className="text-2xl font-bold mb-2">{animal.name}</Text>
      <Text className="text-gray-600 mb-2">{`Species: ${animal.species}`}</Text>
      <Text className="text-gray-600 mb-2">{`Age: ${animal.age}`}</Text>
      <Text className="text-gray-600 mb-4">{`Description: ${
        animal.description || "No description available"
      }`}</Text>

      {/* Action Buttons */}
      <TouchableOpacity
        onPress={() => router.push(`/edit-animal/${animal.id}`)}
        className="bg-blue-500 rounded-full p-3 mb-2"
      >
        <Text className="text-white text-center">Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleDelete}
        className="bg-red-500 rounded-full p-3"
      >
        <Text className="text-white text-center">Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AnimalDetails;
