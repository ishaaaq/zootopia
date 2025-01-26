import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { signup } from "@/lib/AppWrite";
import InputField from "@/components/InputField";
import FormButton from "@/components/FormButton";
import { router } from "expo-router";
const PetBuyerSignupForm = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
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
    setLoading(true);
    const response = await signup("buyer", values);
    if (response) router.replace("../Login");
    setLoading(false);
  };

  return (
    <Formik
      initialValues={{
        name: "",
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
              Create Account
            </Text>
            <Text className="font-light text-center text-gray-500">
              Fill the information below to register your account.{" "}
            </Text>
          </View>

          <InputField
            name="name"
            title="Name"
            placeholder="John Doe"
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            errorMessage={touched.name && errors.name}
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

          <FormButton
            title="Sign Up"
            loading={loading}
            onPress={handleSubmit}
          />
        </ScrollView>
      )}
    </Formik>
  );
};
export default PetBuyerSignupForm;
