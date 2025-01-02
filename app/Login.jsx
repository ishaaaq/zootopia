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
import { router } from "expo-router";

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

  const handleSubmit = () => {
    console.log("Login button pressed");
    router.replace("/HomePage");
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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

// import React from "react";
// import { View, Text, TextInput, Button, StyleSheet } from "react-native";
// import { useRouter } from "expo-router";

// const LoginForm = () => {
//   const router = useRouter();

//   const handleLogin = () => {
//     console.log(router);
//     router.replace("tabs");
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput style={styles.input} placeholder="Email" />
//       <TextInput style={styles.input} placeholder="Password" secureTextEntry />
//       <Button onPress={handleLogin} title="Sign In" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
// });

// export default LoginForm;
