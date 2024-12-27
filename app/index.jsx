import { SafeAreaView, Text, View } from "react-native";
import Card from "@/components/Card";
import panda from "@/assets/images/panda.jpg";
import deer from "@/assets/images/animals/deer.jpg";
import SpeciesFilter from "@/components/SpeciesFilter";
import SearchBar from "@/components/SearchBar";
import Fab from "@/components/Fab";
export default function Index() {
  const handlePress = () => {};
  return (
    <SafeAreaView className="flex justify-center items-center px-1">
      <View className="flex flex-start  w-full">
        <Text className="text-2xl font-bold text-center text-gray-800 mt-10 mb-4">
          Zootopia
        </Text>
        <Text className="text-4xl font-bold text-gray-800  mb-4 text-left">
          My Animals
        </Text>
      </View>
      <SearchBar />
      <SpeciesFilter onSelect={() => {}} />
      <View className="flex flex-row justify-center w-full">
        <Card
          image={panda}
          name="panda"
          Specie="white pands"
          age="20"
          onPress={handlePress}
        />
        <Card
          image={deer}
          name="deer"
          Specie="white pands"
          age="10"
          onPress={handlePress}
        />
      </View>
      <Fab />
    </SafeAreaView>
  );
}
