import Constant from "../../helper/Constant";


const initialState = {
    isLoading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        //Signin
        case Constant.SIGNIN_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case Constant.SIGNIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };
        case Constant.SIGNIN_FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        //SignUp
        case Constant.NEW_SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case Constant.NEW_SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
            };
        case Constant.NEW_SIGNUP_FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }
};
