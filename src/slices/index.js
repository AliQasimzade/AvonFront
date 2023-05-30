import { combineReducers } from "@reduxjs/toolkit";

//front
import LayoutReducer from "./layouts/reducer";
import user from "./layouts/user";

const rootReducer = combineReducers({
    Layout: LayoutReducer,
    User: user
})

export default rootReducer;