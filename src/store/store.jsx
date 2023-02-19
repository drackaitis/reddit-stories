import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import commentReducer from './commentsSlice';

const store = configureStore({
    reducer: {
        posts: postsReducer,
        comments: commentReducer
    }
});

export default store;