import '../global.css'
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {useFonts}from "expo-font"
import { Stack, useRouter } from 'expo-router';
import { SupplierAnimalsProvider } from '@/lib/SupplierAnimalsProvider';
import { AnimalsProvider } from '@/lib/AnimalsProvider';
import { GlobalProvider,  useGlobalContext} from '@/lib/global-provider'
import { ActivityIndicator, StatusBar, View } from 'react-native';
const RootLayout = () => {
 const { userDetails, loading, initialRoute } = useGlobalContext();
    const [fontsLoaded] = useFonts({
        'tc': require('../assets/fonts/tc.ttf'),
        'tc-bold': require('../assets/fonts/tcBold.ttf'),
    })

    const router = useRouter();

    // useEffect(() => {
    //   // Redirect to Zoo UI on app launch
    //   setTimeout(() => {
    //       router.replace('/auth/Login');

    //   }, 2000)
    // }, []);
    
      if (loading) {
        return (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#CE4B26" />
          </View>
        );
      }

    if(!fontsLoaded) return null
    return (
        <>
         <StatusBar
        hidden={false}
        backgroundColor="#CE4B26"
        barStyle="light-content"
        translucent={false}
      />
        <AnimalsProvider>
            <SupplierAnimalsProvider>
            <Stack initialRouteName="GetStarted">
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
           </AnimalsProvider>
        </>
    );
}

const App = () => {
    return (
      <GlobalProvider>
        <RootLayout />
      </GlobalProvider>
    );
  };

export default App;
