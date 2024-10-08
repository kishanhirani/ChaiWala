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
import { Signin, SignUp } from '../../redux/Actions/authActions';
import CheckBox from '@react-native-community/checkbox';
import Loader from '../../Components/Loader';
import Utils from '../../helper/utils'
const Login = ({ navigation }) => {
  const { isLoading } = useSelector((state) => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [remember, setRemember] = useState(false)
  const dispatch = useDispatch()

  const handleLogin = () => {

    let isValid = true

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
        email: email,
        password: password
      }
      dispatch(Signin(body, remember))
    }
  }
  return (
    <ScrollView keyboardShouldPersistTaps={'handled'} style={styles.container}>

      <Loader visible={isLoading} />
      <SBar />
      <Image source={images.tea} style={styles.image} />
      <Text style={styles.loginHeader}>Login</Text>

      <TextInput
        placeholder={"Email"}
        value={email}
        onChangeText={(text) => {
          setEmail(text)
          setEmailError("")
        }}
        autoCapitalize='none'
        error={emailError}
      />

      <TextInput
        onChangeText={(text) => {
          setPassword(text)
          setPasswordError("")
        }}
        value={password}
        placeholder={"Password"}
        autoCapitalize='none'
        secureTextEntry
        error={passwordError}
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


      <View style={{ marginTop: ScaleSize.spacing_60 }} >
        <Button title={'Login'} onPress={() => handleLogin()} />
      </View>

      <Text style={styles.accountText}>Don't have an account? <Text onPress={() => navigation.navigate('SignUp')} style={styles.registerText}>Register Now</Text></Text>

    </ScrollView>
  );
};

export default Login;

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
  rememberText: {
    fontSize: TextFontSize.size_18,
    lineHeight: TextFontSize.size_18 + 15,
    color: Colors.black,
    fontFamily: AppFonts.medium,
  },
  rememberView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  registerText: {
    fontSize: TextFontSize.size_14,
    fontFamily: AppFonts.semi_bold,
    color: Colors.black,
    textDecorationLine: 'underline'
  }
});
