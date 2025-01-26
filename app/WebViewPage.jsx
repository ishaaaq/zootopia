import React from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { useGlobalSearchParams } from "expo-router";
import { createNotification } from "@/lib/AppWrite";
import { useGlobalContext } from "@/lib/global-provider";
const WebViewPage = () => {
  const { userDetails } = useGlobalContext();
  const { url } = useGlobalSearchParams(); // Get URL from route params

  if (!url) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (url.includes("https://b367-102-91-104-203.ngrok-free.app/(supplier)")) {
    // setLoading(false);
    Alert.alert("Success", "Stripe account setup is complete!");

    createNotification(
      userDetails.$id,
      "Stripe onboarding completed",
      "Your account is ready to receive payments."
    );

    // Optionally navigate or update UI state here
    // Navigate to profile page or any other screen
  }

  return (
    <View className="flex-1">
      <WebView
        source={{ uri: url }}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator className="flex-1" size="large" color="#4CAF50" />
        )}
      />
    </View>
  );
};

export default WebViewPage;
