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
import FormButton from "../components/FormButton";
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
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
            <Text className="font-bold text-4xl text-center">Sign In</Text>
          </View>

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
            name="password"
            title="Password"
            placeholder="********"
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            errorMessage={touched.password && errors.password}
            secureTextEntry={!showPassword}
            togglePassword={() => setShowPassword((prev) => !prev)}
          />
          <FormButton title="Sign In" onPress={handleSubmit} />
        </ScrollView>
      )}
    </Formik>
  );
};

export default LoginForm;
