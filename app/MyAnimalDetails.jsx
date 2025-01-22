import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSupplierAnimals } from "@/lib/SupplierAnimalsProvider";
import { deleteAnimal } from "@/lib/AppWrite";
const AnimalDetails = () => {
  const { animalId } = useLocalSearchParams();
  const [animal, setAnimal] = useState();
  const { supplierAnimals, loading, error } = useSupplierAnimals();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const animal = supplierAnimals.find((animal) => animal.$id === animalId);
    setAnimal(animal);
  }, [animalId]);

  const handleDelete = async () => {
    try {
      await deleteAnimal(animal.$id);
      Alert.alert("Success", "Animal deleted successfully");
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  if (loading) {
    return (
      <View className="mx-auto my-auto">
        <Text>loading</Text>
        <ActivityIndicator color="#CE4B26" size="large" />
      </View>
    );
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!animal) {
    return <ActivityIndicator color="#CE4B26" size="large" />;
  }

  return (
    <>
      <SafeAreaView
        style={{ height: "full", width: "100%" }}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <StatusBar backgroundColor="#CE4B26" barStyle="light-content" />
          {/* Animal Image */}
          <View style={{ height: "50%", width: "100%" }} className="relative">
            <Image
              source={{ uri: animal.image }}
              style={{ resizeMode: "cover", height: "100%", width: "100%" }}
            />
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ top: 20, left: 20 }}
              className="absolute bg-white p-2 rounded-lg shadow-sm"
            >
              <Ionicons name="arrow-back" size={25} />
            </TouchableOpacity>
          </View>

          {/* Animal Details */}
          <View
            style={{ height: "100%" }}
            className="mt-[-40px] w-full rounded-t-3xl bg-gray-100 p-4"
          >
            <Text className="text-2xl font-bold text-gray-800">
              {animal.shortDescription}
            </Text>
            <View className="flex flex-row justify-between bg-yellow w-100% mt-4">
              {[
                { label: "Quantity", value: animal.quantity },
                { label: "Price", value: `$${animal.price}` },
                {
                  label: animal.breed !== "" ? "Breed" : "Category",
                  value: animal.breed !== "" ? animal.breed : animal.category,
                },
              ].map((item, index) => (
                <View
                  key={index}
                  style={{ width: 110, height: 120 }}
                  className=" bg-white rounded-lg shadow-md flex flex-col justify-center px-2"
                >
                  <Text className="text-primary font-tc-bold text-center text-2xl">
                    {item.value}
                  </Text>
                  <Text className="text-gray font-tc font-2xl text-center text-sm">
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>

            <Text className="text-lg text-gray-800 mt-2">Description:</Text>
            <Text className="text-sm text-gray-800">
              {animal.longDescription}
            </Text>
            <View style={{ marginTop: "10%" }}>
              <TouchableOpacity
                onPress={() =>
                  router.push(`/EditAnimal?animalId=${animal.$id}`)
                }
                className="bg-primary rounded-md py-3 mt-3 flex-row items-center justify-center"
              >
                <Ionicons name="create-outline" size={25} color="white" />
                <Text
                  className="text-white text-center text-lg "
                  style={{ marginLeft: 10 }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="bg-red-500 rounded-md py-3 mt-3 flex-row items-center justify-center"
              >
                <Ionicons name="trash" size={25} color="white" />
                <Text
                  className="text-white text-center text-lg "
                  style={{ marginLeft: 10 }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="bg-white rounded-lg p-6 w-80">
              <Text className="text-lg font-bold mb-4 text-center">
                Are you sure you want to delete this animal?
              </Text>
              <View className="flex-row justify-between">
                <TouchableOpacity
                  className="bg-gray-300 p-2 rounded-lg flex-1 mr-2"
                  onPress={() => setModalVisible(false)}
                >
                  <Text className="text-center text-white">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-red-500 p-2 rounded-lg flex-1 ml-2"
                  onPress={handleDelete}
                >
                  <Text className="text-center text-white">Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default AnimalDetails;
