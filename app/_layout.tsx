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
import SelectUserType from './SelectUserType'
import ZooSignUp from './ZooSignUp';
import PetBuyerSignup from './PetBuyerSignup'
import PetSupplierSignup from './PetSupplierSignup'
import Login from './Login'
const Stack = createStackNavigator();

const RootLayout = () => {
    return (
        <>
            <Stack.Navigator initialRouteName="GetStarted">
                <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />
                <Stack.Screen name="SelectUserType" component={SelectUserType} options={{ headerShown: false }}/>
                <Stack.Screen name="ZooSignUp" component={ZooSignUp} options={{ headerShown: false }}/>
                <Stack.Screen name="PetBuyerSignup" component={PetBuyerSignup} options={{ headerShown: false }}/>
                <Stack.Screen name="PetSupplierSignup" component={PetSupplierSignup} options={{ headerShown: false }}/>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                {/* Add other screens here */}
            </Stack.Navigator>
        </>
    );
}

export default RootLayout;
