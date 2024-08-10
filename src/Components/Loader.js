import { Image, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../resource/Colors'
import { images } from '../resource/images/images'
import { ScaleSize } from '../resource/ScaleSize'

const Loader = ({ visible }) => {
    return (
        <Modal visible={visible} transparent>
            <View style={styles.mainView}>
                <View style={styles.contentView}>
                    <Image resizeMode='contain' style={styles.loaderImage} source={images.tea1} />
                </View>
            </View>
        </Modal>
    )
}

export default Loader

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: "#00000060",
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentView: {
        backgroundColor: Colors.wheat,
        height: ScaleSize.spacing_100 * 1.2,
        width: ScaleSize.spacing_100 * 1.2,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: ScaleSize.spacing_15
    },
    loaderImage: {
        width: ScaleSize.spacing_80,
        height: ScaleSize.spacing_80,
    }

})