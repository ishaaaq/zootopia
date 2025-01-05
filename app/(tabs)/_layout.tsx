import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Tabs } from "expo-router";
import icons from "@/constants/icons";
import { AnimalsProvider } from "@/lib/AnimalsProvider";
import {ZoosProvider} from "@/lib/ZoosProvider"
import { SellersProvider } from "@/lib/SellersProvider";
const TabIcon = ({ focused, icon, title }) => (
  <View className="flex-1 mt-1 flex flex-col items-center">
    <Image
      source={icon}
      tintColor={focused ? "#0061ff" : "#666876"}
      resizeMode="contain"
      style={{
        width: 20,
        height: 20,
      }}
    />
    <Text
      className={`${
        focused
          ? "text-primary-300 font-rubik-medium"
          : "text-black-200 font-rubik"
      } text-xs w-full text-center mt-1`}
    >
      {title}
    </Text>
  </View>
);

const ZooLayout = () => {
  return (
    <SellersProvider>
      <ZoosProvider>
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          // maxWidth: 70
          width: "full",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} focused={focused} title={"Home"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.search} focused={focused} title={"Explore"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Exchanges"
        options={{
          title: "Exchanges",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.people}
              focused={focused}
              title={"Exchanges"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.person} focused={focused} title={"Profile"} />
          ),
        }}
      />
    </Tabs>
    </ZoosProvider>
    </SellersProvider>
  );
};

const styles = StyleSheet.create({});

export default ZooLayout;

