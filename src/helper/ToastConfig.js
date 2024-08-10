import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../resource/Colors";
import { TextFontSize } from "../resource/TextFontsize";
import { AppFonts } from "../resource/AppFonts";
import { ScaleSize } from "../resource/ScaleSize";
import Toast from "react-native-toast-message";

export const toastConfig = {
    teaToast: (text1) => {
        console.log('text1', text1)
        return (

            <View style={styles.toastView}>
                <Text style={styles.toastText}>{text1.props.message}</Text>
            </View >
        )
    }
};

const styles = StyleSheet.create({
    toastView: {
        height: ScaleSize.spacing_45,
        width: '75%',
        borderRadius: 100,
        backgroundColor: Colors.dark_liver,
        justifyContent: 'center',
        alignItems: 'center'
    },
    toastText: {
        zIndex: 50,
        color: Colors.wheat,
        fontSize: TextFontSize.size_16,
        fontFamily: AppFonts.medium,
        paddingTop: 5
    }
})