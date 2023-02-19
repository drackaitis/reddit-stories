import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "https://api.reddit.com/"

const initialState = {
    allPosts: [],
    subreddits: [],
    query: "",
    status: "idle",
    error: false
}

// Fetch .json directly without authentication. Faster and enough for our needs.
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (selection) => {
    let response;
    // A search term is type 'string' and the default is type 'object'
    if (typeof selection === 'string') {
        response = await fetch(baseURL + selection); 
    } else {
        response = await fetch(baseURL + "r/" + selection.join("+"));
    }
    const json = await response.json();
    return json.data.children.map(post => post.data);
});

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        includeSubreddit: (state, action) => {
            state.subreddits.push(action.payload);
        },
        excludeSubreddit: (state, action) => {
            state.subreddits = state.subreddits.filter(subreddit => subreddit !== action.payload);
        },
        removeAllPosts: (state) => {
            state.allPosts = [];
        },

        addQuery: (state, action) => {
            state.query = action.payload;
        },
        // Currently not implemented. Needs visual elements to dispatch action.
        sortPostsBy: (state, action) => {
            switch (action.payload) {
                case "upvotes": {
                    state.allPosts.sort((a, b) => b.score - a.score);
                    break
                };
                case "newest": {
                    state.allPosts.sort((a, b) => b.created - a.created);
                    break;
                };
                default: {
                    break;
                }
            }
        }
    },
    extraReducers(builder) {
        builder 
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
                // Clear the search term so it won't mess up re-renders.
                state.query = "";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.allPosts = action.payload;
                state.error = false;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.status = "failed";
                state.allPosts = [];
                console.log("Couldn't fetch posts.");
                state.error = true;
            })
            .addDefaultCase((state) => {
                state.status = "idle";
            })
    }
})

export const { includeSubreddit, excludeSubreddit, removeAllPosts, getPostbyId, addQuery} = postsSlice.actions;
export const selectAllPosts = (state) => state.posts.allPosts;
export const selectStatus = (state) => state.posts.status;
export const selectSubreddits = (state) => state.posts.subreddits;
export const selectQuery = (state) => state.posts.query;
export default postsSlice.reducer;