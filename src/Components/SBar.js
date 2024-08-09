import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { Colors, colors } from '../resource/Colors'

const SBar = () => {
    return (
        <StatusBar barStyle={'dark-content'} backgroundColor={Colors.wheat} />
    )
}

export default SBar

