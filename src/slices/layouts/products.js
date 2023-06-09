import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await axios.get("https://avonazerbaijan.com/api/Products/Manage/GetAll?isDeleted=false");
    return response.data;
});
const productsSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});
export default productsSlice.reducer;
