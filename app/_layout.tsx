import '../global.css'
// import { Stack } from "expo-router";
// import HomePage from './HomePage'
// import AddAnimal from './AddAnimal'
// import { createStackNavigator } from '@react-navigation/stack';
// import { Slot } from 'expo-router';
// import {AnimalsProvider} from "../lib/AnimalsProvider"
// import {ZoosProvider} from "../lib/ZoosProvider"
// import React from 'react';
// export default function RootLayout() {
//   return (
//     <AnimalsProvider>
//       <ZoosProvider>

//     <Stack initialRouteName="HomePage" screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="HomePage" />
//     <Stack.Screen name="AddAnimal" />
//   </Stack> 
//       </ZoosProvider>
//     </AnimalsProvider>
//   )
// }

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from './GetStarted'; 
import SelectUserType from './SelectUserType'
import ZooSignUp from './ZooSignUp';
import PetBuyerSignup from './PetBuyerSignup'
import PetSupplierSignup from './PetSupplierSignup'
import Login from './Login'
import {useFonts}from "expo-font"
import { Stack } from 'expo-router';
import { SellersProvider } from '../lib/SellersProvider';
import { AnimalsProvider } from '@/lib/AnimalsProvider';
// const Stack = createStackNavigator();

const RootLayout = () => {
    const [fontsLoaded] = useFonts({
        'tc': require('../assets/fonts/tc.ttf'),
        'tc-bold': require('../assets/fonts/tcBold.ttf'),
    })
    if(!fontsLoaded) return null
    return (
        <>
        <AnimalsProvider>

        <SellersProvider>
            <Stack>
                <Stack.Screen name="GetStarted" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="AnimalDetails" options={{ headerShown: false }} />
                <Stack.Screen name="SelectUserType"  options={{ headerShown: false }}/>
                <Stack.Screen name="ZooSignUp"  options={{ headerShown: false }}/>
                <Stack.Screen name="PetBuyerSignup" options={{ headerShown: false }}/>
                <Stack.Screen name="PetSupplierSignup"  options={{ headerShown: false }}/>
                <Stack.Screen name="Login"  options={{ headerShown: false }}/>
              
            </Stack>
            </SellersProvider>
        </AnimalsProvider>
           



        </>
    );
}

export default RootLayout;
