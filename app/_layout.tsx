import '../global.css'
import { Stack } from "expo-router";
import HomePage from './HomePage'
import AddAnimal from './AddAnimal'
import { createStackNavigator } from '@react-navigation/stack';
import { Slot } from 'expo-router';
import {AnimalsProvider} from "../lib/AnimalsProvider"
import React from 'react';
export default function RootLayout() {
  return (
    <AnimalsProvider>

    <Stack initialRouteName="HomePage" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomePage" />
    <Stack.Screen name="AddAnimal" />
  </Stack> 
    </AnimalsProvider>
  )
}

// import 'react-native-gesture-handler';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import GetStarted from './GetStarted'; 
// import SelectUserType from './SelectUserType'
// import ZooSignUp from './ZooSignUp';
// import PetBuyerSignup from './PetBuyerSignup'
// import PetSupplierSignup from './PetSupplierSignup'
// import Login from './Login'
// const Stack = createStackNavigator();

// const RootLayout = () => {
//     return (
//         <>
//             <Stack.Navigator initialRouteName="GetStarted">
//                 <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />
//                 <Stack.Screen name="SelectUserType" component={SelectUserType} options={{ headerShown: false }}/>
//                 <Stack.Screen name="ZooSignUp" component={ZooSignUp} options={{ headerShown: false }}/>
//                 <Stack.Screen name="PetBuyerSignup" component={PetBuyerSignup} options={{ headerShown: false }}/>
//                 <Stack.Screen name="PetSupplierSignup" component={PetSupplierSignup} options={{ headerShown: false }}/>
//                 <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
              
//             </Stack.Navigator>
           



//         </>
//     );
// }

// export default RootLayout;
