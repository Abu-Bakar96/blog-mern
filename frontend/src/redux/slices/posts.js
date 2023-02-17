import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchSortPosts = createAsyncThunk('posts/fetchSortPosts', async () => {
  const { data } = await axios.get('/sort-posts');
  return data;
});


export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  'posts/fetchRemovePost',
  async (id) => await axios.delete(`/posts/${id}`),
);

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlise = createSlice({
  name: 'posts',
  initialState,
  reducers: {

    setFavPosts(state) {
      state.posts.items.sort((a,b) => b.viewsCount - a.viewsCount)
    },
    // newPosts(state) {
    //   const newItems = state.posts.items.map((el) => {
    //     el.createdAt = el.createdAt.replace(/[^0-9,\s]/g,"").slice(0, -3) * 1
    //     return el
    //   }).sort((a,b) => a.createdAt - b.createdAt)

    //   state.posts.items = newItems
    // },
    setNoFavPosts(state) {
      state.posts.items.sort((a,b) => a.viewsCount -b.viewsCount)
    },

  },
  extraReducers: {
    //получение статей
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    //Получение тэгов
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
    
    // [fetchSortPosts.pending]: (state) => {
    //   state.tags.items = [];
    //   state.tags.status = 'loading';
    // },
    [fetchSortPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;

    },
    // [fetchSortPosts.rejected]: (state) => {
    //   state.tags.items = [];
    //   state.tags.status = 'error';
    // },
    // Удаление статьи

    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
    },
   


  },
});

export const postsRedusers = postsSlise.reducer;

export const {setFavPosts, newPosts, setNoFavPosts} = postsSlise.actions
