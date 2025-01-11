import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const EditAnimal = () => {
  return (
    <View>
      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-base font-semibold text-gray-700">
          {"< Back"}
        </Text>
      </TouchableOpacity>
      <Text>edit animal here</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default EditAnimal;
