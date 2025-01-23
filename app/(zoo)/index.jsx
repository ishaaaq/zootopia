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
import CategoriesFilter from "@/components/CategoriesFilter";
import Card from "@/components/Card";
import FilterModal from "@/components/FilterModal";
import icons from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";
import { fetchAllAnimals } from "@/lib/AppWrite"; // Import Appwrite fetch logic
import { useRouter } from "expo-router";
import { useGlobalContext } from "@/lib/global-provider";
import { useAnimals } from "@/lib/AnimalsProvider";
import BellWithBadge from "@/components/BellWithBadge";
const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 10000]); // Default range
  // const [selectedCategories, setSelectedCategories] = useState([]);
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
      const matchesCategories =
        selectedCategories === "All" ||
        `${animal.category + "s"}`.toLowerCase() ===
          selectedCategories.toLowerCase();
      const matchesSearchQuery = animal.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      // const matchesPrice =
      //   animal.price >= priceRange[0] && animal.price <= priceRange[1];
      // const matchesCategory =
      //   selectedCategories.length === 0 ||
      //   selectedCategories.includes(animal.category);

      return (
        matchesCategories && matchesSearchQuery
        //  &&matchesPrice /*&& matchesCategory*/
      );
    });

    setFilteredAnimals(filtered);
  };

  useEffect(() => {
    if (animalsData) {
      setAnimals(animalsData);
      setFilteredAnimals(animalsData);
    }
  }, [animalsData]);

  // Reapply filters when filters are changed
  useEffect(() => {
    if (
      searchQuery ||
      selectedCategories !== "All"
      // || selectedCategories.length > 0
    ) {
      applyFilters();
    } else {
      // Reset to default display when no filters are applied
      setFilteredAnimals(animalsData);
    }
  }, [searchQuery, selectedCategories /* priceRange  selectedCategories*/]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#CE4B26" />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-white p-4 pb-30">
      {/* Header */}
      <View className="flex flex-row justify-between mb-4">
        <View className="flex-row items-center">
          <Ionicons name="location" color={"gray"} size={20} />
          <Text className="text-xl font-tc-bold text-gray-500">
            {`${userDetails.location}, Nigeria`}
          </Text>
        </View>
        <BellWithBadge />
        {/* <View className="bg-white flex items-center justify-center shadow-md shadow-black-100 rounded-xl w-12 h-12">
          <Image
            source={icons.bell}
            resizeMode="contain"
            style={{ width: 25, height: 25 }}
          />
        </View> */}
      </View>

      {/* Greeting */}
      {userDetails ? (
        <Text className="text-3xl font-tc-bold mt-auto">{`Hello ${userDetails.zooname}`}</Text>
      ) : (
        <ActivityIndicator size="small" color="#CE4B26" />
      )}

      {/* Search Bar */}
      <View className="flex flex-row justify-between mt-4">
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

      {/* Categories Filter */}
      <Text className="mt-4 mb-2 font-tc-bold text-2xl">Categories</Text>
      <CategoriesFilter
        Categories={[
          { name: "All", emoji: "🌍" },
          { name: "Mammals", emoji: "🦁" },
          { name: "Birds", emoji: "🐦" },
          { name: "Reptiles", emoji: "🐍" },
          { name: "Amphibians", emoji: "🐸" },
          { name: "Fish", emoji: "🐟" },
          { name: "Others", emoji: "🌀" },
        ]}
        selectedCategories={selectedCategories}
        onSelectCategories={(Category) =>
          setSelectedCategories(
            selectedCategories === Category ? "All" : Category
          )
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
