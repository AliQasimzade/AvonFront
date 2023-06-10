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
        updateIncBasket(state, action) {
            state.basket = state.basket.map(item => {
                 if(item.product.skuId == action.payload) {
                     item.productCount = item.productCount + 1
                 }
                 return item
            })
        },
        updateDecBasket(state, action) {
            state.basket = state.basket.map(item => {
                 if(item.product.skuId == action.payload) {
                     item.productCount = item.productCount - 1
                 }
                 return item
            })
        }
        
    }
})

export const { getAllBaskets,updateIncBasket,updateDecBasket } = Basket.actions;
export default Basket.reducer;