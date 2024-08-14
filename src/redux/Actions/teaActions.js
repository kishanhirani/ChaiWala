import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../helper/Api";
import Constant from "../../helper/Constant";
import { DialogueHelper } from "../../helper/DialogueHelper";

export function fetchTeas(body, remember) {
    return (dispatch) => {
        dispatch({ type: Constant.FETCH_TEAS_REQUEST, body: body });
        return Api.post("tea/getTea", body)
            .then(async (response) => {
                const responseData = response.data;
                if (responseData.success) {

                    dispatch({
                        type: Constant.FETCH_TEAS_SUCCESS,
                        payload: responseData,
                    });
                } else {
                    DialogueHelper(responseData)
                    dispatch({
                        type: Constant.FETCH_TEAS_FAILURE,
                        payload: responseData,
                    });
                }
            })
            .catch((error) => {
                console.log('error', error)
                DialogueHelper(error)
                dispatch({ type: Constant.FETCH_TEAS_FAILURE, payload: error });
            });
    };
}

export function addTea(body, callback) {
    return (dispatch) => {
        dispatch({ type: Constant.ADD_TEA_REQUEST, body: body });
        return Api.post("tea/addTea", body)
            .then(async (response) => {
                const responseData = response.data;
                if (responseData.success) {
                    callback(true)
                    dispatch({
                        type: Constant.ADD_TEA_SUCCESS,
                        payload: responseData,
                    });
                } else {
                    callback(false)
                    DialogueHelper(responseData)
                    dispatch({
                        type: Constant.ADD_TEA_FAILURE,
                        payload: responseData,
                    });
                }
            })
            .catch((error) => {
                console.log('error', error)
                callback(false)
                DialogueHelper(error)
                dispatch({ type: Constant.ADD_TEA_FAILURE, payload: error });
            });
    };
}
export function updateTea(body, callback) {
    return (dispatch) => {
        dispatch({ type: Constant.UPDATE_TEA_REQUEST, body: body });
        return Api.post("tea/updateTea", body)
            .then(async (response) => {
                const responseData = response.data;
                if (responseData.success) {
                    callback(true)
                    dispatch({
                        type: Constant.UPDATE_TEA_SUCCESS,
                        payload: responseData,
                    });
                } else {
                    callback(false)
                    DialogueHelper(responseData)
                    dispatch({
                        type: Constant.UPDATE_TEA_FAILURE,
                        payload: responseData,
                    });
                }
            })
            .catch((error) => {
                console.log('error', error)
                callback(false)
                DialogueHelper(error)
                dispatch({ type: Constant.UPDATE_TEA_FAILURE, payload: error });
            });
    };
}