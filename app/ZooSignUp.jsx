import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import InputField from "../components/InputField";
import FormButton from "@/components/FormButton";
const ZooSignupForm = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const validationSchema = Yup.object().shape({
    zooName: Yup.string().required("Zoo Name is required"),
    zooLocation: Yup.string().required("Zoo Location is required"),
    registrationNumber: Yup.string().required(
      "Registration Number is required"
    ),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be 10 digits")
      .required("Phone Number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const zooLocations = [
    "Abuja",
    "Lagos",
    "Port Harcourt",
    "Kano",
    "Ogun",
    "Enugu",
    "Kaduna",
    "Benin City",
  ];

  return (
    <Formik
      initialValues={{
        zooName: "",
        zooLocation: "",
        registrationNumber: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
      }) => (
        <ScrollView className="p-4 bg-white">
          <View className="mb-5 mt-10">
            <Text className="font-bold text-4xl text-center">
              Create Zoo Account
            </Text>
            <Text className="font-light text-center text-gray-500">
              Sign up with the details of your zoo
            </Text>
          </View>

          <InputField
            name="zooName"
            title="Zoo Name"
            placeholder="Aldusar park and zoo"
            value={values.zooName}
            onChangeText={handleChange("zooName")}
            onBlur={handleBlur("zooName")}
            errorMessage={touched.zooName && errors.zooName}
          />

          <View className="mb-4">
            <Text className="text-gray-700 font-bold">Zoo Location</Text>
            <Picker
              selectedValue={values.zooLocation}
              onValueChange={handleChange("zooLocation")}
              onBlur={handleBlur("zooLocation")}
              className="border p-2 rounded-full"
            >
              <Picker.Item label="Select a Location" value="" />
              {zooLocations.map((location) => (
                <Picker.Item key={location} label={location} value={location} />
              ))}
            </Picker>
            {touched.zooLocation && errors.zooLocation && (
              <Text className="text-red-500">{errors.zooLocation}</Text>
            )}
          </View>

          <InputField
            name="registrationNumber"
            title="Registration Number"
            placeholder="9156872NG"
            value={values.registrationNumber}
            onChangeText={handleChange("registrationNumber")}
            onBlur={handleBlur("registrationNumber")}
            errorMessage={
              touched.registrationNumber && errors.registrationNumber
            }
          />

          <InputField
            name="email"
            title="Email"
            placeholder="example@gmail.com"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            errorMessage={touched.email && errors.email}
          />

          <InputField
            name="phoneNumber"
            title="Phone Number"
            placeholder="0812345678"
            value={values.phoneNumber}
            onChangeText={handleChange("phoneNumber")}
            onBlur={handleBlur("phoneNumber")}
            errorMessage={touched.phoneNumber && errors.phoneNumber}
            keyboardType="numeric"
          />

          <InputField
            name="password"
            title="Password"
            placeholder="********"
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            errorMessage={touched.password && errors.password}
            secureTextEntry={!showPassword.password}
            togglePassword={() =>
              setShowPassword((prev) => ({ ...prev, password: !prev.password }))
            }
          />

          <InputField
            name="confirmPassword"
            title="Confirm Password"
            placeholder="********"
            value={values.confirmPassword}
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            errorMessage={touched.confirmPassword && errors.confirmPassword}
            secureTextEntry={!showPassword.confirmPassword}
            togglePassword={() =>
              setShowPassword((prev) => ({
                ...prev,
                confirmPassword: !prev.confirmPassword,
              }))
            }
          />

          <FormButton title="Sign up" onPress={handleSubmit} />
        </ScrollView>
      )}
    </Formik>
  );
};

export default ZooSignupForm;
