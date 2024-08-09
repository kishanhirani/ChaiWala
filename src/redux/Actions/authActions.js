import Api from "../../helper/Api";
import Constant from "../../helper/Constant";
import { DialogueHelper } from "../../helper/DialogueHelper";


export function Signin(body) {
    return (dispatch) => {
        dispatch({ type: Constant.SIGNIN_REQUEST, body: body });
        return Api.post("user/loginUser", body)
            .then((response) => {
                const responseData = response.data;
                if (responseData.success) {
                    console.log('responseData', responseData)
                    dispatch({
                        type: Constant.SIGNIN_REQUEST,
                        payload: responseData,
                    });
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
                // callback(error, false);
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
                    dispatch({
                        type: Constant.NEW_SIGNUP_SUCCESS,
                        payload: responseData,
                    });
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
