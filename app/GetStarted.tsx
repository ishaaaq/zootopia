import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import image from "../assets/images/get-started.png"
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
const GetStarted = () => {
    return (
        <SafeAreaView className=' h-full flex items-center'>
            <ScrollView className='h-full w-full' contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={image} resizeMode='contain' style={{width: 420, height: 420}} />
                <View className='flex flex-col gap-5 mt-10  px-5' >
                <Text className='font-bold text-3xl text-black text-center'>Your Hub for Wildlife {"\n"} Sourcing and Pet Purchases</Text>
                <Text className='text-center text-gray-500 text-sm'>Discover a smarter way for zoos to exchange animals {"\n"}and for pet lovers to connect with trusted suppliers</Text>
              <CustomButton onPress={() => router.push('/SelectUserType')} text='Lets Get Started'/>
                    <View className='flex flex-row justify-center'>
                    <Text>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('Login')}>

                        < Text className='underline'>Sign In</Text>
                        </TouchableOpacity>
                        </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default GetStarted;
