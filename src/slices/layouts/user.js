import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
   token:'',
   userId:''
}

const User = createSlice({
    name: "User",
    initialState,
    reducers: {
        changeUserId(state, action) {
            state.userId = action.payload
        },
        changeToken(state, action) {
            state.token = action.payload
        },
        logoutToken(state){
            state.token = ""
        },
        logoutUserId(state){
            state.userId = ""
        },
    }
})

export const { changeUserId, changeToken, logoutToken,logoutUserId } = User.actions;
export default User.reducer;