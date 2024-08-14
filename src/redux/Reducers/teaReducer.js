import Constant from "../../helper/Constant";


const initialState = {
    isLoading: false,
    addLoading: false,
    updateLoading: false,
    page: 1,
    totalPage: 100,
    teas: []

};

export default (state = initialState, action) => {
    switch (action.type) {
        //SignUp
        case Constant.FETCH_TEAS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case Constant.FETCH_TEAS_SUCCESS:
            return {
                ...state,
                teas: action?.payload?.page === 1 ? action.payload.data : [...state.teas, ...action.payload.data],
                page: action.payload.page,
                totalPage: action.payload.totalPage,
                isLoading: false
            };
        case Constant.FETCH_TEAS_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        //add update tea
        case Constant.ADD_TEA_REQUEST:
            return {
                ...state,
                addLoading: true,
            };
        case Constant.ADD_TEA_SUCCESS:
            return {
                ...state,
                addLoading: false
            };
        case Constant.ADD_TEA_FAILURE:
            return {
                ...state,
                addLoading: false,
            };
        //add update tea
        case Constant.UPDATE_TEA_REQUEST:
            return {
                ...state,
                updateLoading: true,
            };
        case Constant.UPDATE_TEA_REQUEST:
            return {
                ...state,
                updateLoading: false
            };
        case Constant.UPDATE_TEA_REQUEST:
            return {
                ...state,
                updateLoading: false,
            };

        default:
            return state;
    }
};
