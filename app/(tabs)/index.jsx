import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import SearchBar from "@/components/SearchBar";
import SpeciesFilter from "@/components/SpeciesFilter";
import Card from "@/components/Card";

import { useAnimals } from "@/lib/AnimalsProvider";
import icons from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";
import FilterModal from "../../components/FilterModal";
import sellers from "@/lib/data";
import { useRouter } from "expo-router";

const index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("All");
  const species = ["All", "Mammals", "Birds", "Reptiles", "Amphibians", "Fish"];
  const { animals } = useAnimals();
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const router = useRouter();
  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const filteredAnimals = animals.filter((animal) => {
    const matchesSpecies =
      selectedSpecies === "All" ||
      `${animal.species + "s"}` === selectedSpecies;
    const matchesSearchQuery = animal.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSpecies && matchesSearchQuery;
  });

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <View className="flex flex-row justify-between mb-4 px-4">
        <Text className="text-2xl font-tc-bold mt-auto">Zootopia</Text>
        <View className="bg-white flex items-center justify-center shadow-md shadow-black-100 rounded-xl w-12 h-12">
          <Image
            source={icons.bell}
            resizeMode="contain"
            style={{ width: 25, height: 25 }}
          />
        </View>
      </View>
      <View className="flex flex-row justify-between mt-4 px-4">
        <SearchBar
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity
          onPress={toggleFilterModal}
          className="bg-primary-50 flex items-center justify-center rounded-xl w-13 h-13"
        >
          {/* <Image
            source={icons.filter}
            resizeMode="contain"
            style={{ width: 25, height: 25, color: "#CE4B26" }}
          /> */}
          <Ionicons name="filter" color="#CE4B26" size={25} />
        </TouchableOpacity>
      </View>

      <Text className="mt-4 mb-2 font-tc-bold text-2xl ml-3">Species</Text>

      <SpeciesFilter
        species={species}
        selectedSpecies={selectedSpecies}
        onSelectSpecies={(specie) =>
          setSelectedSpecies(selectedSpecies === specie ? null : specie)
        }
      />

      <View className="flex flex-row flex-wrap justify-center w-full">
        {sellers.map((seller) =>
          seller.animals.map((animal) => (
            <View key={animal.id} className="w-1/2">
              <Card
                {...animal}
                onPress={() =>
                  router.push(
                    `/AnimalDetails?sellerId=${seller.id}&animalId=${animal.id}`
                  )
                }
              />
            </View>
          ))
        )}
      </View>

      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={toggleFilterModal}
      />

      {/* <FloatingActionButton onPress={() => router.push("/AddAnimal")} /> */}
    </ScrollView>
  );
};

export default index;
