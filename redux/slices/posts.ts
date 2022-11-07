import { createSlice } from '@reduxjs/toolkit'
import { fetchPosts, fetchRemovePost, fetchTags, fetchUserPosts } from '../asyncActions'

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.items = []
      state.posts.status = 'loading'
    })
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload
      state.posts.status = 'loaded'
    })
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.items = []
      state.posts.status = 'error'
    })
    builder.addCase(fetchTags.pending, (state) => {
      state.tags.items = []
      state.tags.status = 'loading'
    })
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags.items = action.payload
      state.tags.status = 'loaded'
    })
    builder.addCase(fetchTags.rejected, (state) => {
      state.tags.items = []
      state.tags.status = 'error'
    })
    builder.addCase(fetchRemovePost.pending, (state, action) => {
      state.posts.items = state.posts.items.filter((obj: any) => obj._id !== action.meta.arg)
    })
    //user's posts
    builder.addCase(fetchUserPosts.pending, (state) => {
      state.posts.items = []
      state.posts.status = 'loading'
    })
    builder.addCase(fetchUserPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload
      state.posts.status = 'loaded'
    })
    builder.addCase(fetchUserPosts.rejected, (state) => {
      state.posts.items = []
      state.posts.status = 'error'
    })
  },
})

export const postsSelector = (state: any) => state.posts

export const postsReducer = postsSlice.reducer
