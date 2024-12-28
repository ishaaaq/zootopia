import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
const AddAnimal = () => {
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const initialValues = {
    name: "",
    species: "",
    dob: "",
    description: "",
    image: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Animal name is required"),
    species: Yup.string().required("Species is required"),
    dob: Yup.date().required("Date of birth is required"),
    description: Yup.string(),
    image: Yup.mixed().required("Image is required"),
  });

  const calculateAge = (dob) => {
    const now = new Date();
    const diff = now - new Date(dob);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days < 30) return `${days} days old`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months old`;
    const years = Math.floor(months / 12);
    return `${years} years old`;
  };

  const handleFormSubmit = (values) => {
    const age = calculateAge(values.dob);
    console.log({ ...values, age });
    //add animals to array here
    Alert.alert("Animal Added", `The animal is ${age}`, [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  const pickImage = async () => {
    // Ask for media library permissions
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <Ionicons name="arrow-back" size={24} color="blue" />
      </TouchableOpacity>
      <Text className="text-2xl font-bold mb-6">Add Animal</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            {/* Name */}
            <Text className="text-lg font-semibold mb-2">Animal Name</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter animal name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {touched.name && errors.name && (
              <Text className="text-red-500 mb-4">{errors.name}</Text>
            )}

            {/* Species */}
            <Text className="text-lg font-semibold mb-2">Species</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter species"
              onChangeText={handleChange("species")}
              onBlur={handleBlur("species")}
              value={values.species}
            />
            {touched.species && errors.species && (
              <Text className="text-red-500 mb-4">{errors.species}</Text>
            )}

            {/* DOB */}
            <Text className="text-lg font-semibold mb-2">Date of Birth</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="border border-gray-300 rounded p-3 mb-4 bg-gray-100"
            >
              <Text>{dob ? dob.toDateString() : "Select Date"}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setDob(selectedDate);
                    handleChange("dob")(selectedDate.toISOString());
                  }
                }}
              />
            )}
            {touched.dob && errors.dob && (
              <Text className="text-red-500 mb-4">{errors.dob}</Text>
            )}

            {/* Image Upload */}
            <Text className="text-lg font-semibold mb-2">Upload Image</Text>
            <TouchableOpacity
              onPress={pickImage}
              className="border border-gray-300 rounded p-3 mb-4 bg-gray-100"
            >
              <Text>Select Image</Text>
            </TouchableOpacity>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                className="w-32 h-32 rounded mb-4"
              />
            )}
            {errors.image && touched.image && (
              <Text className="text-red-500 mb-4">{errors.image}</Text>
            )}

            {/* Description */}
            <Text className="text-lg font-semibold mb-2">Description</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter description (optional)"
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
            />
            {touched.description && errors.description && (
              <Text className="text-red-500 mb-4">{errors.description}</Text>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-blue-500 rounded-full p-3"
            >
              <Text className="text-white text-center text-lg">Add Animal</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default AddAnimal;
