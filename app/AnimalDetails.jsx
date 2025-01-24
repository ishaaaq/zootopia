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
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAnimals } from "@/lib/AnimalsProvider";
import { databases, config, getConversations } from "@/lib/AppWrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useStripe } from "@stripe/stripe-react-native";
import { Screen } from "react-native-screens";

const AnimalDetails = () => {
  const { sellerId, animalId } = useLocalSearchParams();
  const [animal, setAnimal] = useState();
  const [seller, setSeller] = useState();
  const [quantity, setQuantity] = useState(1);
  const { animalsData } = useAnimals();
  const { userDetails } = useGlobalContext();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const animal = animalsData.find((animal) => animal.$id === animalId);
    setAnimal(animal);
    setSeller(animal.supplier);
  }, [animalId]);

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const handleStartChat = async () => {
    // Check if a conversation already exists with the user
    const conversations = await getConversations(userDetails.$id);
    let conversation = conversations.find((conv) =>
      conv.participants.includes(seller.$id && userDetails.$id)
    );

    if (!conversation) {
      conversation = await databases.createDocument(
        config.database,
        config.conversation,
        "unique()",
        {
          participants: [userDetails.$id, seller.$id],
          timestamp: new Date(),
        }
      );
    }
    return router.push(
      `/ChatScreen?conversationId=${conversation.$id}&participantName=${seller.name}&senderId=${userDetails.$id}`
    );
  };

  const fetchPaymentSheetParams = async () => {
    const priceInCents = totalPrice * 100;
    const response = await fetch(`http://192.168.118.196:3000/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: priceInCents }),
    });

    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    console.log("initializing oayment intent");
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: false,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  if (!animal || !seller) {
    return <ActivityIndicator color="#CE4B26" size="large" />;
  }
  const totalPrice = animal.price * quantity;

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* Animal Image */}
          <View style={{ height: 300, width: "100%" }} className="relative">
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
          <View className="mt-[-40px] w-full rounded-t-3xl bg-gray-100 p-4">
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
                  style={{ width: 100, height: 110 }}
                  // style={{ width: 110, height: 120 }}
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
              <TouchableOpacity onPress={handleStartChat}>
                <MaterialCommunityIcons
                  name="message"
                  size={30}
                  color="#CE4B26"
                />
              </TouchableOpacity>
            </View>
            <Text className="text-lg text-gray-800 mt-2">Description:</Text>
            <Text className="text-sm text-gray-800">
              {animal.longDescription}
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
            <TouchableOpacity
              onPress={openPaymentSheet}
              className="bg-primary rounded-md py-3  flex-row items-center justify-center"
            >
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
