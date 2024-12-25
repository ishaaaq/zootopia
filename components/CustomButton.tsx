import { RelativePathString, router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props{
    onPress: () => void,
    text: string
}

const CustomButton = ({text, onPress} : Props) => {
    return (
         <TouchableOpacity onPress={onPress} className='flex justify-center h-15 rounded-full bg-black mx-10'>
                        <Text className='text-white  text-md text-center'>
                            {text}
                            </Text>
                            </TouchableOpacity>
    );
}

const styles = StyleSheet.create({})

export default CustomButton;
