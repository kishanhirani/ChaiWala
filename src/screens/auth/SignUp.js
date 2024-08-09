import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../resource/Colors';
import SBar from '../../Components/SBar';
import { images } from '../../resource/images/images';
import { ScaleSize } from '../../resource/ScaleSize';
import { AppFonts } from '../../resource/AppFonts';
import { TextFontSize } from '../../resource/TextFontsize';
import TextInput from '../../Components/TextInput';
import Button from '../../Components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUser, Signin } from '../../redux/Actions/authActions';

const SignUp = ({ navigation }) => {
    const { isLoading } = useSelector((state) => state.auth)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const handleSignup = () => {
        let body = {
            name: name,
            email: email,
            password: password
        }
        dispatch(RegisterUser(body))

    }
    return (
        <ScrollView keyboardShouldPersistTaps={'always'} style={styles.container}>

            <SBar />
            <Image source={images.tea} style={styles.image} />
            <Text style={styles.loginHeader}>Register</Text>

            <TextInput
                placeholder={"Name"}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                placeholder={"Email"}
                onChangeText={(text) => setEmail(text)}
                keyboardType={'email-address'}
                autoCapitalize='none'
            />
            <TextInput
                onChangeText={(text) => setPassword(text)}
                placeholder={"Password"}
                autoCapitalize='none'
                secureTextEntry
            />

            <View style={{ marginTop: ScaleSize.spacing_30 }} >
                <Button isLoading={isLoading} title={'Register'} onPress={() => handleSignup()} />
            </View>

            <Text style={styles.accountText}>Already have an account? <Text onPress={() => navigation.navigate('SignUp')} style={styles.registerText}>Sign in</Text></Text>

        </ScrollView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.wheat,
        paddingHorizontal: ScaleSize.spacing_30
    },
    image: {
        height: ScaleSize.spacing_100 * 2.5,
        width: ScaleSize.spacing_100 * 2.5,
        marginTop: ScaleSize.spacing_60,
        alignSelf: "center"
    },
    loginHeader: {
        alignSelf: "center",
        color: Colors.black,
        fontFamily: AppFonts.bold,
        fontSize: TextFontSize.size_34,
        top: -ScaleSize.spacing_20,
        marginBottom: ScaleSize.spacing_30
    },
    accountText: {
        fontSize: TextFontSize.size_14,
        color: Colors.black,
        fontFamily: AppFonts.semi_bold,
        alignSelf: "center",
        marginTop: ScaleSize.spacing_5
    },
    registerText: {
        fontSize: TextFontSize.size_14,
        fontFamily: AppFonts.bold,
        color: Colors.black,
        textDecorationLine: 'underline'
    }
});
