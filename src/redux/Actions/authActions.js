import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../helper/Api";
import Constant from "../../helper/Constant";
import { DialogueHelper } from "../../helper/DialogueHelper";
import { reset } from "../../helper/NavigationHelper";


export function Signin(body, remember) {
    return (dispatch) => {
        dispatch({ type: Constant.SIGNIN_REQUEST, body: body });
        return Api.post("user/loginUser", body)
            .then(async (response) => {
                const responseData = response.data;
                if (responseData.success) {
                    setTimeout(() => {
                        dispatch({
                            type: Constant.SIGNIN_SUCCESS,
                            payload: responseData,
                        });
                        reset('appNavigator', {})
                    }, 1000);
                    if (remember) {
                        await AsyncStorage.setItem("@id", responseData.token)
                    }
                    await AsyncStorage.setItem("@token", responseData.token)
                } else {
                    DialogueHelper(responseData)
                    dispatch({
                        type: Constant.SIGNIN_FAILURE,
                        payload: responseData,
                    });
                }
            })
            .catch((error) => {
                console.log('error', error)
                DialogueHelper(error)
                dispatch({ type: Constant.SIGNIN_FAILURE, payload: error });
            });
    };
}
export function RegisterUser(body) {
    return (dispatch) => {
        dispatch({ type: Constant.NEW_SIGNUP_REQUEST, body: body });
        return Api.post("user/createUser", body)
            .then((response) => {
                const responseData = response.data;
                console.log('responseData', responseData)
                if (responseData.success) {
                    setTimeout(() => {

                        dispatch({
                            type: Constant.NEW_SIGNUP_SUCCESS,
                            payload: responseData,
                        });
                    }, 1000);
                } else {
                    DialogueHelper(responseData)
                    dispatch({
                        type: Constant.NEW_SIGNUP_FAILURE,
                        payload: responseData,
                    });
                }
            })
            .catch((error) => {
                console.log('error', error)
                DialogueHelper(error)
                // callback(error, false);
                dispatch({ type: Constant.NEW_SIGNUP_FAILURE, payload: error });
            });
    };
}
