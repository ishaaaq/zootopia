import { router } from "expo-router";
import { Alert } from "react-native";

export const showAlert = (message) => {
  Alert.alert(
    "Sign in to continue",
    message,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Alert dismissed"),
      },
      {
        text: "OK",
        onPress: () => router.push("GetStarted"),
        style: "cancel",
      },
    ],
    { cancelable: true }
  );
};
