import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    user:{}
}
const Accont = createSlice({
    name: "Accont",
    initialState,
    reducers: {
        changeAccont(state, action) {
            state.user = {...action.payload}

        },
        logoutUser(state) {
            state.user={}
        }
    }
})

export const { changeAccont, logoutUser} = Accont.actions;
export default Accont.reducer;