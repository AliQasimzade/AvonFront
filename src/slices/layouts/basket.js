import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  basket:[]
}

const Basket = createSlice({
    name: "Basket",
    initialState,
    reducers: {
        getAllBasket(state, action) {
            state.basket = [...action.payload]
        }
    }
})

export const { getAllBasket } = Basket.actions;
export default Basket.reducer;