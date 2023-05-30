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
        }
    }
})

export const { changeUserId, changeToken } = User.actions;
export default User.reducer;