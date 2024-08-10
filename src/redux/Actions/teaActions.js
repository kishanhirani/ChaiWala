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
                    setTimeout(() => {

                        dispatch({
                            type: Constant.FETCH_TEAS_SUCCESS,
                            payload: responseData,
                        });
                    }, 1000);
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