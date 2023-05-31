import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchComments = createAsyncThunk("comments/fetchComments", async () => {
    const response = await axios.get("http://avontest0910-001-site1.dtempurl.com/api/Comments/Manage/GetAll?isDeleted=false");
    return response.data;
});
const commentsSlice = createSlice({
    name: "comments",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});
export default commentsSlice.reducer;
