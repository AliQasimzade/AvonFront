import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSubCategories = createAsyncThunk("subCategories/fetchSubCategories", async () => {
    const response = await axios.get("http://avontest0910-001-site1.dtempurl.com/api/SubCatigories/Manage/GetAll?isDeleted=false");
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
