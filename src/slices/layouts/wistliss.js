import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  wisslist:[]
}

const Wisslist= createSlice({
    name: "Wisslist",
    initialState,
    reducers: {
        getAllWisslist(state, action) {
            state.wisslist = [...action.payload]
        }
    }
})

export const { getAllWisslist } = Wisslist.actions;
export default Wisslist.reducer;