import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import React from 'react'
import Home from '../screens/home/Home';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';

export const RootNavigator = () => {

    const Stack = createNativeStackNavigator()
    return (
        <View style={{ flex: 1 }}>

            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={"authNavigator"} component={AuthNavigator} />
                <Stack.Screen name={"appNavigator"} component={AppNavigator} />
            </Stack.Navigator>

        </View>
    )
}
