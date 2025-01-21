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
import { addZooAnimal } from "@/lib/AppWrite";
import sadpup from "@/assets/images/animals/criollo.jpg";
import DateTimePicker from "@react-native-community/datetimepicker";
import { launchImageLibrary } from "react-native-image-picker";
import { DropdownField } from "../components/NewInput";
const AddZooAnimal = () => {
  const [photo, setPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { userDetails, user } = useGlobalContext();
  const handleImagePicker = () => {
    setModalVisible(true);
  };

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

  const handleSubmit = async (values) => {
    const zooId = userDetails.$id;
    const response = await addZooAnimal(zooId, photo, values);
    if (response) setSuccessVisible(true);
  };

  const selectImageFromGallery = async () => {
    try {
      setModalVisible(false);

      const result = await launchImageLibrary({
        mediaType: "photo",
        quality: 1,
      });

      if (!result.didCancel && result.assets) {
        const file = result.assets[0];
        console.log("file:", file);
        return {
          uri: file.uri,
          name: "image.jpg",
          type: "image/jpeg", // MIME type (e.g., image/jpeg)
        };
      }

      throw new Error("Image selection canceled");
    } catch (error) {
      console.log(error);
    }
  };
  const initialValues = {
    name: "",
    dob: "",
    type: "",
    category: "",
    breed: "",
    quantity: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    type: Yup.string().required("Type is required"),
    category: Yup.string().required("Category is required"),
    dob: Yup.date().required("Date of birth is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .positive("Quantity must be positive")
      .integer("Quantity must be an integer"),

    description: Yup.string().required("Description is required"),
    breed: Yup.string(), // Optional field
  });

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
            Add new Animal to your zoo
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
            <Text className="text-gray-700 mb-2">Date of Birth</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="bg-white rounded-lg border border-gray-300 h-13 flex justify-center"
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
            {/* Long Description */}
            <InputField
              label="Detailed Description"
              placeholder="Detailed description that ansers buyers' FAQ"
              multiline
              numberOfLines={4}
              onChangeText={handleChange("longDescription")}
              onBlur={handleBlur("longDescription")}
              value={values.description}
              error={errors.description}
              touched={touched.description}
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
            {/* <TouchableOpacity
              className="p-4 border-b border-gray-300"
              onPress={() => {
                setPhoto("camera-photo-uri"); // Placeholder URI
                setModalVisible(false);
              }}
            >
              <Text className="text-center text-blue-500">Camera</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              className="p-4 border-b border-gray-300"
              onPress={async () => {
                setPhoto(await selectImageFromGallery());
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

export default AddZooAnimal;
