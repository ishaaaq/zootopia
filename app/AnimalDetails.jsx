import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { useSellers } from "@/lib/SellersProvider";
import sellers from "@/lib/data";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
const AnimalDetails = () => {
  const { sellerId, animalId } = useLocalSearchParams();
  const [animal, setAnimal] = useState();
  const [seller, setSeller] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (sellerId && animalId) {
      const seller = sellers.find((seller) => seller.id === Number(sellerId));
      if (seller) {
        const animal = seller.animals.find(
          (animal) => animal.id === Number(animalId)
        );
        if (animal) {
          setSeller(seller);
          setAnimal(animal);
        } else {
          console.error("Animal not found");
        }
      } else {
        console.error("Seller not found");
      }
    }
  }, [sellerId, animalId, sellers]);

  if (!animal || !seller) {
    return (
      <View className="flex-1 bg-white p-4">
        <Text>Loading...</Text>
      </View>
    );
  }
  const totalPrice = animal.price * quantity;
  return (
    <>
      <SafeAreaView
        style={{ height: "full", width: "100%" }}
        className="flex-1"
      >
        <ScrollView>
          <StatusBar backgroundColor="#CE4B26" barStyle="light-content" />
          {/* Animal Image */}
          <View style={{ height: "50%", width: "100%" }} className="relative">
            <Image
              source={animal.image}
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
              {`Handsome ${animal.name} with awesome features like 4 legs and 1 cool looking tail`}
            </Text>
            <View className="flex flex-row justify-between bg-yellow w-100% mt-4">
              {[
                { label: "Quantity", value: animal.quantity },
                { label: "Price", value: `$${animal.price}` },
                { label: "Breed", value: animal.specie },
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

            {/* Seller Info */}
            <View className="flex-row justify-between items-center mt-4 bg-white h-20 p-2">
              <View
                style={{ width: 170 }}
                className="flex flex-row items-center justify-between"
              >
                <Ionicons name="person" color="gray" size={35} />
                <View className="flex flex-col">
                  <Text className="text-lg font-tc text-gray-600">
                    Owned By:
                  </Text>
                  <Text className="text-lg font-tc-bold text-black">
                    {seller.name}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => console.log("Navigate to Inbox")}
              >
                <MaterialCommunityIcons
                  name="message"
                  size={30}
                  color="#CE4B26"
                />
              </TouchableOpacity>
            </View>
            <Text className="text-lg text-gray-800 mt-2">Description:</Text>
            <Text className="text-sm text-gray-800">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
            {/* Quantity Picker */}
            <View className="flex-row justify-between my-4">
              <View className="flex-row items-center my-4">
                <Text className="text-lg text-gray-800 mr-4">Quantity:</Text>
                <View className="flex-row items-center border rounded-md mr-5">
                  <Button
                    title="-"
                    onPress={() => setQuantity(Math.max(1, quantity - 1))}
                  />
                  <Text className="mx-2">{quantity}</Text>
                  <Button title="+" onPress={() => setQuantity(quantity + 1)} />
                </View>
              </View>
              {/* Total Price */}
              <View className="flex-row items-center">
                <Text className="text-lg text-gray-800 ml-4 mr-4">
                  Total Price:
                </Text>
                <Text className="text-xl text-primary font-tc-bold my-auto">{`$${totalPrice}`}</Text>
              </View>
            </View>
            {/* Buy Now Button */}
            <TouchableOpacity className="bg-primary rounded-md py-3 mt-3 flex-row items-center justify-center">
              <Ionicons name="cart" size={25} color="white" />
              <Text
                className="text-white text-center text-lg "
                style={{ marginLeft: 10 }}
              >
                Proceed to checkout
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default AnimalDetails;
