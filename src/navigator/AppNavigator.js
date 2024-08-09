import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import React from 'react'
import Home from '../screens/home/Home';

export const AppNavigator = () => {

    const Stack = createNativeStackNavigator()
    return (
        <View style={{ flex: 1 }}>

            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={"Home"} component={Home} />
            </Stack.Navigator>
        </View>
    )
}

