import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { router, useLocalSearchParams } from "expo-router";
import { InputField, DropdownField } from "@/components/NewInput";
import { Ionicons } from "@expo/vector-icons";
import { useSupplierAnimals } from "@/lib/SupplierAnimalsProvider";
import { updateAnimal } from "@/lib/AppWrite";
const EditAnimal = () => {
  const { animalId } = useLocalSearchParams();
  const [animal, setAnimal] = useState();
  const { supplierAnimals, loading, error } = useSupplierAnimals();
  // const [isChecked, setIsChecked] = useState(false);

  // const handleCheckboxChange = () => setIsChecked(!isChecked);
  useEffect(() => {
    const animal = supplierAnimals.find((animal) => animal.$id === animalId);
    setAnimal(animal);
    // setIsChecked(animal.exoticPet);
  }, [animalId]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    type: Yup.string().required("Type is required"),
    category: Yup.string().required("Category is required"),
    breed: Yup.string(),
    shortDescription: Yup.string().required("Short description is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .min(1, "Quantity must be at least 1"),
    price: Yup.number()
      .required("Price is required")
      .min(10, "Price must be at least 10"),
    longDescription: Yup.string().required("Long description is required"),
    exoticPet: Yup.boolean(),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    const updatedData = {};
    for (const key in values) {
      if (key === "quantity" || key === "price") {
        if (Number(values[key]) !== animal[key]) {
          updatedData[key] = Number(values[key]);
        }
      } else if (values[key] !== animal[key]) {
        updatedData[key] = values[key];
      }
    }
    console.log("updated data:", updatedData);
    try {
      await updateAnimal(animalId, updatedData);
      Alert.alert("Success", "Animal updated successfully");
      router.back();
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };
  if (!animal) {
    return <ActivityIndicator color="#CE4B26" size="large" />;
  }

  if (loading) {
    return (
      <View className="mx-auto my-auto">
        <Text>loading</Text>
        <ActivityIndicator color="#CE4B26" size="large" />
      </View>
    );
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="flex-1 px-4 py-6  bg-gray-100"
    >
      <Text className="text-lg font-semibold text-gray-700 mb-4">
        Edit Animal
      </Text>
      <View className="relative">
        {/* Animal Image */}
        <Image
          source={{ uri: animal.image }}
          className="w-full h-56 rounded-lg"
          style={{ resizeMode: "cover" }}
        />
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-5 left-5 bg-white p-2 rounded-lg"
        >
          <Ionicons name="arrow-back" size={25} />
        </TouchableOpacity>
      </View>
      ;
      <Formik
        initialValues={{
          name: animal.name || "",
          type: animal.type || "",
          category: animal.category || "",
          breed: animal.breed || "",
          shortDescription: animal.shortDescription || "",
          quantity: animal.quantity || "",
          price: animal.price || "",
          longDescription: animal.longDescription || "",
          // exoticPet: isChecked || false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View>
            <InputField
              label="Name"
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              error={touched.name && errors.name}
              className="mb-4"
              touched={touched.name}
            />
            <DropdownField
              label="Type"
              selectedValue={values.type}
              onValueChange={handleChange("type")}
              options={[
                { label: "Mammals", value: "mammal" },
                { label: "Reptiles", value: "reptile" },
                { label: "Birds", value: "bird" },
                { label: "Fish", value: "fish" },
                { label: "Amphibians", value: "amphibian" },
                { label: "Other", value: "others" },
              ]}
              error={touched.type && errors.type}
              className="mb-4"
            />
            <DropdownField
              label="Category"
              selectedValue={values.category}
              onValueChange={handleChange("category")}
              options={[
                { label: "Domestic", value: "domestic" },
                { label: "Wild", value: "wild" },
              ]}
              error={touched.category && errors.category}
              className="mb-4"
            />
            <InputField
              label="Breed"
              value={values.breed}
              onChangeText={handleChange("breed")}
              onBlur={handleBlur("breed")}
              error={touched.breed && errors.breed}
              className="mb-4"
            />
            <InputField
              label="Short Description"
              value={values.shortDescription}
              onChangeText={handleChange("shortDescription")}
              onBlur={handleBlur("shortDescription")}
              error={touched.shortDescription && errors.shortDescription}
              multiline
              className="mb-4"
            />
            <InputField
              label="Quantity"
              value={values.quantity}
              onChangeText={handleChange("quantity")}
              onBlur={handleBlur("quantity")}
              error={touched.quantity && errors.quantity}
              keyboardType="numeric"
              className="mb-4"
            />
            <InputField
              label="Price"
              value={values.price}
              onChangeText={handleChange("price")}
              onBlur={handleBlur("price")}
              error={touched.price && errors.price}
              keyboardType="numeric"
              className="mb-4"
            />
            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Switch
                value={values.exoticPet}
                onValueChange={handleCheckboxChange}
                trackColor={{ false: "#d1d5db", true: "#CE4B26" }}
                thumbColor={isChecked ? "#CE4B26" : "#f4f4f5"}
              />
              <Text className="text-gray-700">
                Is this Animal an exotic pet?
              </Text>
            </View> */}
            <InputField
              label="Long Description"
              value={values.longDescription}
              onChangeText={handleChange("longDescription")}
              onBlur={handleBlur("longDescription")}
              error={touched.longDescription && errors.longDescription}
              multiline
              className="mb-0"
            />
            <TouchableOpacity
              className=" bg-primary-500 py-4 rounded-lg mb-10"
              onPress={handleSubmit}
            >
              <Text className="text-white text-center font-bold">Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default EditAnimal;
