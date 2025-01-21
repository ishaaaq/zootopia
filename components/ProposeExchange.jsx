import React, { useState } from "react";
import { View, Text, Picker, TextInput, TouchableOpacity } from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useAnimals } from "@/lib/AnimalsProvider";

const ProposeExchangePage = () => {
  const { zooId, animalId } = useGlobalSearchParams(); // Passed zoo and animal ID
  const { animals } = useAnimals();
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [notes, setNotes] = useState("");
  const router = useRouter();

  const myAnimals = animals; // Assume user's animals list

  const handleSubmit = () => {
    console.log(`Proposing exchange: ${selectedAnimal} for ${animalId}`);
    console.log("Notes:", notes);
    router.push("/exchanges");
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Propose Exchange</Text>

      {/* Select Your Animal */}
      <Text className="mb-2">Select one of your animals:</Text>
      <Picker
        selectedValue={selectedAnimal}
        onValueChange={(itemValue) => setSelectedAnimal(itemValue)}
      >
        {myAnimals.map((animal) => (
          <Picker.Item key={animal.id} label={animal.name} value={animal.id} />
        ))}
      </Picker>

      {/* Add Notes */}
      <Text className="mt-4 mb-2">Add Notes:</Text>
      <TextInput
        placeholder="Optional notes about this exchange..."
        value={notes}
        onChangeText={setNotes}
        className="bg-gray-200 p-3 rounded-lg"
      />

      {/* Submit */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-primary-500 p-4 rounded mt-4"
      >
        <Text className="text-white text-center">Submit Proposal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProposeExchangePage;
