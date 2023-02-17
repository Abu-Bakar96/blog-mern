import { configureStore } from '@reduxjs/toolkit';
import { postsRedusers } from './slices/posts';
import { authReducer } from './slices/auth';

const store = configureStore({
    reducer: {
        posts: postsRedusers,
        auth: authReducer
    }
})

export default store