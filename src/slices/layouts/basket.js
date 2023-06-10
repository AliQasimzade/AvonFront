import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  basket:[]
}

const Basket = createSlice({
    name: "Basket",
    initialState,
    reducers: {
        getAllBaskets(state, action) {
            state.basket = action.payload
        },
        
    }
})

export const { getAllBaskets } = Basket.actions;
export default Basket.reducer;