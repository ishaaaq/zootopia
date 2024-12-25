// import { Stack } from "expo-router";
import '../global.css'
// export default function RootLayout() {
//   return <Stack initialRouteName="GetStarted" screenOptions={{headerShown: false}}/>;
// }

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from './GetStarted'; // Adjust the import path as necessary

const Stack = createStackNavigator();

const RootLayout = () => {
    return (
        <>
            <Stack.Navigator initialRouteName="GetStarted">
                <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />
                {/* Add other screens here */}
            </Stack.Navigator>
        </>
    );
}

export default RootLayout;
