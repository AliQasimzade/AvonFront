import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSubCategories = createAsyncThunk("subCategories/fetchSubCategories", async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}SubCatigories/GetAll?isDeleted=false`);
    return response.data;
});
const subCategoriesSlice = createSlice({
    name: "subCategories",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSubCategories.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});
export default subCategoriesSlice.reducer;
