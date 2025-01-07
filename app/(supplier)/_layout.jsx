import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Tabs } from "expo-router";
import { ZoosProvider } from "@/lib/ZoosProvider";
import { SellersProvider } from "@/lib/SellersProvider";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const TabIcon = ({ focused, IconComponent, iconName, title }) => (
  <View className="flex-1 mt-1 flex flex-col items-center">
    <IconComponent
      name={iconName}
      size={20}
      color={focused ? "#CE4B26" : "#666876"}
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
              width: "full",
              height: 60,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  IconComponent={Ionicons}
                  iconName={focused ? "home" : "home-outline"}
                  focused={focused}
                  title="Home"
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Transactions"
            options={{
              title: "Transactions",
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  IconComponent={MaterialCommunityIcons}
                  iconName={
                    focused ? "clipboard-list" : "clipboard-list-outline"
                  }
                  focused={focused}
                  title="Transactions"
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Messages"
            options={{
              title: "Messages",
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  IconComponent={Ionicons}
                  iconName={focused ? "chatbox" : "chatbox-outline"}
                  focused={focused}
                  title="Messages"
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
                <TabIcon
                  IconComponent={Ionicons}
                  iconName={focused ? "person" : "person-outline"}
                  focused={focused}
                  title="Profile"
                />
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
