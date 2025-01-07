import '../global.css'
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {useFonts}from "expo-font"
import { Stack, useRouter } from 'expo-router';
import { SellersProvider } from '../lib/SellersProvider';
import { AnimalsProvider } from '@/lib/AnimalsProvider';
const RootLayout = () => {
    const [fontsLoaded] = useFonts({
        'tc': require('../assets/fonts/tc.ttf'),
        'tc-bold': require('../assets/fonts/tcBold.ttf'),
    })

    const router = useRouter();

    useEffect(() => {
      // Redirect to Zoo UI on app launch
      router.replace('/(supplier)');
    }, []);

    if(!fontsLoaded) return null
    return (
        <>
        <AnimalsProvider>

        <SellersProvider>
            <Stack>
                <Stack.Screen name="(zoo)" options={{ headerShown: false }} />
                <Stack.Screen name="(buyer)" options={{ headerShown: false }} />
                <Stack.Screen name="(supplier)" options={{ headerShown: false }} />
                <Stack.Screen name="AddAnimal" options={{ headerShown: false }} />
                 <Stack.Screen name="GetStarted" options={{ headerShown: false }} />
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
