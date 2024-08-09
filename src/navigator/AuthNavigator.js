import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import React from 'react'
import Home from '../screens/home/Home';
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';

export const AuthNavigator = () => {

    const Stack = createNativeStackNavigator()
    return (
        <View style={{ flex: 1 }}>

            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={"Login"} component={Login} />
                <Stack.Screen name={"SignUp"} component={SignUp} />
            </Stack.Navigator>
        </View>
    )
}
