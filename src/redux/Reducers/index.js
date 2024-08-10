import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import teaReducer from "./teaReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    tea: teaReducer

});

export default (state, action) => {

    return rootReducer(state, action);
};
