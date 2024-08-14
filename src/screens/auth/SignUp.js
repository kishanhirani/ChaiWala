import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
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
import Utils from '../../helper/utils';
import CheckBox from '@react-native-community/checkbox';

const SignUp = ({ navigation }) => {
    const { isLoading } = useSelector((state) => state.auth)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [nameError, setNameError] = useState('')

    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const nameRef = useRef(null)
    const [remember, setRemember] = useState(false)


    const dispatch = useDispatch()
    const handleSignup = () => {


        let isValid = true

        if (Utils.isValueStringNull(name)) {
            setNameError("Name is required.")
            isValid = false
        }
        if (Utils.isValueStringNull(email)) {
            setEmailError("Email is required.")
            isValid = false
        } else if (!Utils.isValidEmail(email)) {
            setEmailError('Invaid Email Address')
            isValid = false
        }
        if (Utils.isValueStringNull(password)) {
            setPasswordError("Password is required.")
            isValid = false
        } else if (password.length < 6) {
            setPasswordError('The password must contain at least 6 characters.')
            isValid = false
        }
        if (isValid) {

            let body = {
                name: name,
                email: email,
                password: password
            }
            dispatch(RegisterUser(body, remember))
        }

    }
    return (
        <ScrollView keyboardShouldPersistTaps={'always'} style={styles.container}>

            <SBar />
            <Image source={images.tea} style={styles.image} />
            <Text style={styles.loginHeader}>Register</Text>

            <TextInput
                placeholder={"Name"}
                refs={nameRef}
                returnKeyType={'next'}
                onChangeText={(text) => {
                    setName(text)
                    setNameError('')
                }}
                value={name}
                error={nameError}
                onSubmitEditing={() => emailRef?.current?.focus()}
                blurOnSubmit={false}
            />
            <TextInput
                value={email}
                refs={emailRef}
                placeholder={"Email"}
                returnKeyType={'next'}
                onChangeText={(text) => {
                    setEmail(text)
                    setEmailError('')
                }}
                keyboardType={'email-address'}
                autoCapitalize='none'
                onSubmitEditing={() => { passwordRef?.current?.focus() }}
                error={emailError}
                blurOnSubmit={false}
            />
            <TextInput
                returnKeyType={'done'}
                refs={passwordRef}
                onChangeText={(text) => {
                    setPassword(text)
                    setPasswordError('')
                }}
                placeholder={"Password"}
                autoCapitalize='none'
                secureTextEntry
                error={passwordError}
                onSubmitEditing={() => {
                    passwordRef?.current?.blur()
                    handleSignup()
                }}
                blurOnSubmit={false}
            />
            <View style={styles.rememberView}>
                <CheckBox
                    disabled={false}
                    value={remember}
                    onValueChange={(newValue) => setRemember(newValue)}
                    tintColors={{ false: Colors.black, true: Colors.dark_liver }}
                />
                <Text style={styles.rememberText}>Remember me</Text>
            </View>

            <View style={{ marginTop: ScaleSize.spacing_30 }} >
                <Button title={'Register'} onPress={() => handleSignup()} />
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
        fontFamily: AppFonts.semi_bold,
        fontSize: TextFontSize.size_34,
        top: -ScaleSize.spacing_20,
        marginBottom: ScaleSize.spacing_30
    },
    accountText: {
        fontSize: TextFontSize.size_14,
        color: Colors.black,
        fontFamily: AppFonts.medium,
        alignSelf: "center",
        marginTop: ScaleSize.spacing_5
    },
    registerText: {
        fontSize: TextFontSize.size_14,
        fontFamily: AppFonts.semi_bold,
        color: Colors.black,
        textDecorationLine: 'underline'
    }
});
