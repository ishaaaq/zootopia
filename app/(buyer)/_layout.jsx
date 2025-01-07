import React from "react";
import { Tabs } from "expo-router";

export default function PetBuyerLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="AnotherPage" options={{ title: "Explore" }} />
      {/* <Tabs.Screen name="cart" options={{ title: 'Cart' }} /> */}
    </Tabs>
  );
}
