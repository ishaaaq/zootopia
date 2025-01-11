import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";
import { InputField } from "../components/NewInput";
import { useGlobalContext } from "@/lib/global-provider";
import { addAnimal } from "@/lib/AppWrite";
import sadpup from "@/assets/images/animals/criollo.jpg";
const AddAnimal = () => {
  const [photo, setPhoto] = useState(sadpup);
  const [modalVisible, setModalVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const { userDetails, user } = useGlobalContext();
  const handleImagePicker = () => {
    setModalVisible(true);
  };

  const handleSubmit = async (values) => {
    const supplierId = userDetails.$id;
    const response = await addAnimal(supplierId, photo, values);
    if (response) setSuccessVisible(true);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    type: Yup.string().required("Type is required"),
    category: Yup.string().required("Category is required"),
    shortDescription: Yup.string().required("Short description is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .positive("Quantity must be positive")
      .integer("Quantity must be an integer"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be positive"),
    longDescription: Yup.string().required("Long description is required"),
    breed: Yup.string(), // Optional field
  });

  const initialValues = {
    name: "",
    type: "",
    category: "",
    breed: "",
    shortDescription: "",
    quantity: "",
    price: "",
    longDescription: "",
  };

  const DropdownField = ({
    label,
    selectedValue,
    onValueChange,
    options,
    error,
    touched,
  }) => (
    <View className="mb-6">
      <Text className="text-gray-700 mb-2">{label}</Text>
      <View className="bg-white rounded-lg border border-gray-300 h-13 flex justify-center">
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          className="h-13"
        >
          <Picker.Item label={`Select ${label.toLowerCase()}`} value="" />
          {options.map((option, index) => (
            <Picker.Item
              key={index}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
      {touched && error && <Text className="text-red-500 mt-2">{error}</Text>}
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4 mb-15">
      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-white p-2 rounded-lg shadow-sm w-10 mb-2"
      >
        <Ionicons name="arrow-back" size={25} />
      </TouchableOpacity>
      {/* Header */}
      <View className="bg-white rounded-lg shadow-md flex flex-row justify-between">
        <View className="ml-4 mt-4">
          <Text className="text-lg font-bold text-primary-500">
            Add new Animal
          </Text>
          <Text className="text-sm text-gray-500">
            Add new Animal to marketplace
          </Text>
        </View>
        <Image
          style={{ width: 100, height: 100 }}
          source={require("@/assets/images/Pup.jpg")}
        />
      </View>

      {/* Image Picker */}
      <TouchableOpacity
        className="mt-6 bg-gray-200 w-full h-40 rounded-lg flex items-center justify-center border border-gray-300"
        onPress={handleImagePicker}
      >
        {photo ? (
          <Image
            source={photo}
            style={{ width: "100%", height: "100%" }}
            className="w-full h-full rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <View className="flex-row items-center">
            <Ionicons name="camera" size={34} color={"#CE4B26"} />
            <Text className="text-primary-500 text-2xl"> Add photo</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values); // Handle form submission
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View className="mt-2">
            {/* Name */}
            <InputField
              label="Name"
              placeholder="Enter animal's name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              error={errors.name}
              touched={touched.name}
            />
            {/* Type */}
            <DropdownField
              label="Type"
              selectedValue={values.type}
              onValueChange={handleChange("type")}
              options={[
                { label: "Domestic", value: "domestic" },
                { label: "Wild", value: "wild" },
              ]}
              error={errors.type}
              touched={touched.type}
            />
            {/* Category */}
            <DropdownField
              label="Category"
              selectedValue={values.category}
              onValueChange={handleChange("category")}
              options={[
                { label: "Mammals", value: "mammal" },
                { label: "Reptiles", value: "reptile" },
                { label: "Birds", value: "bird" },
                { label: "Fish", value: "fish" },
                { label: "Amphibians", value: "amphibian" },
                { label: "Other", value: "others" },
              ]}
              error={errors.category}
              touched={touched.category}
            />
            {/* Breed */}
            <InputField
              label="Breed"
              placeholder="Enter breed (optional)"
              onChangeText={handleChange("breed")}
              onBlur={handleBlur("breed")}
              value={values.breed}
              error={errors.breed}
              touched={touched.breed}
            />
            {/* Short Description */}
            <InputField
              label="Short Description"
              placeholder="Enter a short description for your animal(s)"
              onChangeText={handleChange("shortDescription")}
              onBlur={handleBlur("shortDescription")}
              value={values.shortDescription}
              error={errors.shortDescription}
              touched={touched.shortDescription}
            />
            {/* Quantity */}
            <InputField
              label="Quantity"
              placeholder="22"
              keyboardType="numeric"
              onChangeText={handleChange("quantity")}
              onBlur={handleBlur("quantity")}
              value={values.quantity}
              error={errors.quantity}
              touched={touched.quantity}
            />
            {/* Price */}
            <InputField
              label="Price"
              placeholder="Enter price"
              keyboardType="numeric"
              onChangeText={handleChange("price")}
              onBlur={handleBlur("price")}
              value={values.price}
              error={errors.price}
              touched={touched.price}
            />
            {/* Long Description */}
            <InputField
              label="Detailed Description"
              placeholder="Detailed description that ansers buyers' FAQ"
              multiline
              numberOfLines={4}
              onChangeText={handleChange("longDescription")}
              onBlur={handleBlur("longDescription")}
              value={values.longDescription}
              error={errors.longDescription}
              touched={touched.longDescription}
            />
            <TouchableOpacity
              className=" bg-primary-500 py-4 rounded-lg"
              onPress={handleSubmit}
            >
              <Text className="text-white text-center font-bold">Add</Text>
            </TouchableOpacity>{" "}
          </View>
        )}
      </Formik>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
          <View className="bg-white w-4/5 p-4 rounded-lg">
            <Text className="text-center font-bold mb-4">Add a Photo</Text>
            <TouchableOpacity
              className="p-4 border-b border-gray-300"
              onPress={() => {
                setPhoto("camera-photo-uri"); // Placeholder URI
                setModalVisible(false);
              }}
            >
              <Text className="text-center text-blue-500">Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-4 border-b border-gray-300"
              onPress={() => {
                setPhoto("gallery-photo-uri"); // Placeholder URI
                setModalVisible(false);
              }}
            >
              <Text className="text-center text-blue-500">Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-4"
              onPress={() => {
                setPhoto(null);
                setModalVisible(false);
              }}
            >
              <Text className="text-center text-red-500">Remove Image</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={successVisible}
        animationType="fade"
        onRequestClose={() => setSuccessVisible(false)}
      >
        <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
          <View className="bg-white w-4/5 p-6 rounded-lg items-center">
            <Ionicons name="shield-checkmark" size={40} color="#CE4B26" />
            <Text className="text-lg font-bold text-center mt-4">
              Your pet successfully added
            </Text>
            <TouchableOpacity
              className="mt-6 bg-primary-500 px-6 py-2 rounded-lg"
              onPress={() => setSuccessVisible(false)}
            >
              <Text className="text-white font-bold">Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AddAnimal;
