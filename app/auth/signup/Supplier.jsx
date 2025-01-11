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
import InputField from "@/components/InputField";
import FormButton from "@/components/FormButton";
import { signup } from "@/lib/AppWrite";
import { router } from "expo-router";
const PetSupplierSignupForm = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const validationSchema = Yup.object().shape({
    businessName: Yup.string().required("Business Name is required"),
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

  const handleSubmit = async (values) => {
    const response = await signup("supplier", values);
    if (response) router.replace("(supplier)");
  };

  return (
    <Formik
      initialValues={{
        businessName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
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
              Supplier Signup
            </Text>
            <Text className="font-light text-center text-gray-500">
              Fill the information below to register your seller account.{" "}
            </Text>
          </View>

          <InputField
            name="businessName"
            title="Business Name"
            placeholder="Best Pet Supplies"
            value={values.businessName}
            onChangeText={handleChange("businessName")}
            onBlur={handleBlur("businessName")}
            errorMessage={touched.businessName && errors.businessName}
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

          <FormButton title="Sign Up" onPress={handleSubmit} />
        </ScrollView>
      )}
    </Formik>
  );
};

export default PetSupplierSignupForm;
