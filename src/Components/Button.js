import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScaleSize } from '../resource/ScaleSize'
import { Colors } from '../resource/Colors'
import { AppFonts } from '../resource/AppFonts'
import { TextFontSize } from '../resource/TextFontsize'

const Button = (props) => {



    const styles = StyleSheet.create({
        buttonView: {
            backgroundColor: Colors.dark_liver,
            justifyContent: "center",
            paddingVertical: ScaleSize.spacing_15,
            borderRadius: ScaleSize.spacing_100,
            justifyContent: "center",
            alignItems: "center"
        },
        title: {
            color: Colors.wheat,
            fontFamily: AppFonts.semi_bold,
            fontSize: TextFontSize.size_20
        }

    })


    return (
        <TouchableOpacity onPress={props.onPress} style={styles.buttonView}>
            {props.isLoading ?
                <ActivityIndicator size={ScaleSize.spacing_30} color={Colors.primary} /> : <Text style={styles.title}>{props.title}</Text>
            }
        </TouchableOpacity>
    )
}

export default Button
