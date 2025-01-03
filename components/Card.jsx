import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const AnimalCard = ({ image, name, specie, price, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="m-2 pb-2 bg-white rounded-lg shadow w-43"
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
          <Text className="text-lg font-bold text-gray-800">{name}</Text>

          <Text className="text-sm text-gray-500">{`Specie: ${specie}`}</Text>
        </View>
        <Text className="font-tc-bold text-gray-500 my-auto">{`$${price}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AnimalCard;
