import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import SearchBar from "@/components/SearchBar";
import SpeciesFilter from "@/components/SpeciesFilter";
import Card from "@/components/Card";
import FilterModal from "@/components/FilterModal";
import icons from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";
import { fetchAllAnimals } from "@/lib/AppWrite"; // Import Appwrite fetch logic
import { useRouter } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider";
import { useAnimals } from "@/lib/AnimalsProvider";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 10000]); // Default range
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [animals, setAnimals] = useState();
  const { userDetails } = useGlobalContext();
  const { animalsData, error, loading } = useAnimals();
  const router = useRouter();

  const toggleFilterModal = () => setFilterModalVisible(!isFilterModalVisible);

  // Filter Logic
  const applyFilters = () => {
    const filtered = animals.filter((animal) => {
      const matchesSpecies =
        selectedSpecies === "All" ||
        `${animal.category + "s"}`.toLowerCase() ===
          selectedSpecies.toLowerCase();
      const matchesSearchQuery = animal.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPrice =
        animal.price >= priceRange[0] && animal.price <= priceRange[1];
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(animal.category);

      // console.log({
      //   animal,
      //   matchesSpecies,
      //   matchesSearchQuery,
      //   matchesPrice,
      //   matchesCategory,
      // });

      return (
        matchesSpecies && matchesSearchQuery && matchesPrice && matchesCategory
      );
    });

    setFilteredAnimals(filtered);
  };

  useEffect(() => {
    setAnimals(animalsData);
    setFilteredAnimals(animalsData);
  }, []);

  // Reapply filters when filters are changed
  useEffect(() => {
    if (
      searchQuery ||
      selectedSpecies !== "All" ||
      selectedCategories.length > 0
    ) {
      applyFilters();
    } else {
      // Reset to default display when no filters are applied
      setFilteredAnimals(animals);
    }
  }, [searchQuery, selectedSpecies, priceRange, selectedCategories]);

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Header */}
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

      {/* Greeting */}
      <Text className="text-3xl font-tc-bold mt-auto">{`Hello ${userDetails?.zooname}`}</Text>

      {/* Search Bar */}
      <View className="flex flex-row justify-between mt-4 px-4">
        <SearchBar
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity
          onPress={toggleFilterModal}
          className="bg-primary-50 flex items-center justify-center rounded-xl w-13 h-13"
        >
          <Ionicons name="filter" color="#CE4B26" size={25} />
        </TouchableOpacity>
      </View>

      {/* Species Filter */}
      <Text className="mt-4 mb-2 font-tc-bold text-2xl ml-3">Categories</Text>
      <SpeciesFilter
        species={[
          "All",
          "Mammals",
          "Birds",
          "Reptiles",
          "Amphibians",
          "Fish",
          "Others",
        ]}
        selectedSpecies={selectedSpecies}
        onSelectSpecies={(specie) =>
          setSelectedSpecies(selectedSpecies === specie ? "All" : specie)
        }
      />

      {/* Animal Cards */}
      {loading ? (
        <ActivityIndicator size="large" color="#CE4B26" />
      ) : (
        <View className="flex flex-row flex-wrap justify-center w-full">
          {filteredAnimals?.map((animal) => (
            <View key={animal.$id} className="w-1/2">
              <Card
                {...animal}
                onPress={() =>
                  router.push(`/AnimalDetails?animalId=${animal.$id}`)
                }
              />
            </View>
          ))}
        </View>
      )}

      {/* Filter Modal */}
      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={toggleFilterModal}
        onApplyFilters={(filters) => {
          setPriceRange(filters.priceRange);
          setSelectedCategories(filters.categories);
          toggleFilterModal();
        }}
      />
    </ScrollView>
  );
};

export default Index;
