import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
    const response = await axios.get("http://avontest0910-001-site1.dtempurl.com/api/Categories/Manage/GetAll?isDeleted=false");
    return response.data;
  });
  const categoriesSlice = createSlice({
    name: "categories",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchCategories.fulfilled, (state, action) => {
        return action.payload;
      });
    },
  });
  export default categoriesSlice.reducer;
    