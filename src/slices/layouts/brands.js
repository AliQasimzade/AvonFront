import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
    const response = await axios.get("https://ilkin944-001-site1.itempurl.com/api/Brands/Manage/GetAll?isDeleted=false");
    return response.data;
});
const brandsSlice = createSlice({
    name: "brands",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBrands.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});
export default brandsSlice.reducer;
