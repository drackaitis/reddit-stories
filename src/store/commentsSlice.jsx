import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    allComments: [],
    status: "idle",
    error: null
}

export const fetchComments = createAsyncThunk("comments/fetchComments", async (postURL) => {
    const response = await fetch(postURL + ".json");
    const json = await response.json();
    const data = json[1].data.children.map(comment => comment.data).sort((a, b) => b.score - a.score);
    data.filter(a => a.body !== /^\[.+\]$/);
    return data;
})

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchComments.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.allComments = action.payload;
                state.error = false
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = "failed";
                state.error = true;
            })
    }
})

export const selectAllComments = (state) => state.comments.allComments;
export const selectStatus = (state) => state.comments.status;
export default commentsSlice.reducer;