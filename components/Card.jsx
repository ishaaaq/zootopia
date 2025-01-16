import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const AnimalCard = ({ image, name, category, price, quantity, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="m-2 pb-2 bg-white rounded-lg shadow w-43 overflow-hidden"
    >
      {/* Animal Image */}
      <Image
        source={image}
        className=" rounded-t-lg"
        resizeMode="cover"
        style={{ width: "100%", height: 170 }}
      />

      {/* Animal Details */}
      <View className="px-2 flex flex-row justify-between">
        <View>
          <Text className="text-lg font-bold text-gray-800">
            {name.length > 10 ? name.slice(0, 10) : name}
          </Text>

          <Text className="text-sm text-gray-500">{`Qty: ${quantity}`}</Text>
          <Text className="text-sm text-gray-500">{`${category}`}</Text>
        </View>
        <Text className="font-tc-bold text-primary-600 my-auto">{`$${price}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AnimalCard;
