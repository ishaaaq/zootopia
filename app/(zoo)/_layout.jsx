// import React from "react";
// import { StyleSheet, View } from "react-native";
// import { Tabs } from "expo-router";

// const TabIcon = ({ focused, icon, title }) => (
//   <View className="flex-1 mt-1 flex flex-col items-center">
//     <Image
//       source={icon}
//       tintColor={focused ? "#0061ff" : "#666876"}
//       resizeMode="contain"
//       className="size-6"
//     />
//     <Text
//       className={`${
//         focused
//           ? "text-primary-300 font-rubik-medium"
//           : "text-black-200 font-rubik"
//       } text-xs w-full text-center mt-1`}
//     >
//       {title}
//     </Text>
//   </View>
// );

// const ZooLayout = () => {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           backgroundColor: "white",
//           position: "absolute",
//           borderTopColor: "#0061FF1A",
//           borderTopWidth: 1,
//           // maxWidth: 70
//           width: "full",
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <TabIcon icon={icons.home} focused={focused} title={"Home"} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="Explore"
//         options={{
//           title: "Explore",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <TabIcon icon={icons.search} focused={focused} title={"Explore"} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           headerShown: false,
//           tabBarIcon: ({ focused }) => (
//             <TabIcon icon={icons.person} focused={focused} title={"Profile"} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// };

// const styles = StyleSheet.create({});

// export default ZooLayout;
