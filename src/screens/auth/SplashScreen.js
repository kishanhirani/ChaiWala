import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { images } from '../../resource/images/images'
import { Colors } from '../../resource/Colors'
import { reset } from '../../helper/NavigationHelper'
import SBar from '../../Components/SBar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScaleSize } from '../../resource/ScaleSize'

const SplashScreen = () => {
    const handleLog = async () => {
        const token = await AsyncStorage.getItem("@id")
        setTimeout(() => {
            token ? reset('appNavigator') : reset('Login')
        }, 1000);
    }
    useEffect(() => {
        handleLog()
    }, [])

    return (
        <View style={styles.container}>
            <SBar />
            <Image source={images.tea} style={{ width: ScaleSize.spacing_100 * 2.6, height: ScaleSize.spacing_100 * 2.6 }} />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.wheat,
        justifyContent: "center",
        alignItems: "center"
    },

})