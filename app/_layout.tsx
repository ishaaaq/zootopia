import '../global.css'
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {useFonts}from "expo-font"
import { Stack, useRouter } from 'expo-router';
import { SupplierAnimalsProvider } from '@/lib/SupplierAnimalsProvider';
import { AnimalsProvider } from '@/lib/AnimalsProvider';
import { GlobalProvider} from '@/lib/global-provider'
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

       
            <GlobalProvider>
            <SupplierAnimalsProvider>
            
            <Stack>
                 <Stack.Screen name="GetStarted" options={{ headerShown: false }} />
                <Stack.Screen name="(zoo)" options={{ headerShown: false }} />
                <Stack.Screen name="(buyer)" options={{ headerShown: false }} />
                <Stack.Screen name="(supplier)" options={{ headerShown: false }} />
                <Stack.Screen name="AddAnimal" options={{ headerShown: false }} />
                <Stack.Screen name="EditAnimal" options={{ headerShown: false }} />
                <Stack.Screen name="EditProfile" options={{ headerShown: false }} />
                <Stack.Screen name="AnimalDetails" options={{ headerShown: false }} />
                <Stack.Screen name="MyAnimalDetails" options={{ headerShown: false }} />
                <Stack.Screen name="SelectUserType"  options={{ headerShown: false }}/>
                <Stack.Screen name="auth/signup/Zoo"  options={{ headerShown: false }}/>
                <Stack.Screen name="auth/signup/PetBuyer" options={{ headerShown: false }}/>
                <Stack.Screen name="auth/signup/Supplier"  options={{ headerShown: false }}/>
                <Stack.Screen name="auth/Login"  options={{ headerShown: false }}/>
            </Stack>
            </SupplierAnimalsProvider>
            </GlobalProvider>
           
        </AnimalsProvider>
           



        </>
    );
}

export default RootLayout;
