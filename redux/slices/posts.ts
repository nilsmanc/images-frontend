import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchPost, fetchPosts, fetchRemovePost, fetchTags, fetchUserPosts } from '../asyncActions'
import { RootState } from '../store'
import { PostType, PostsSliceState, Status } from './types'

const initialState: PostsSliceState = {
  posts: {
    items: [],
    status: Status.LOADING,
  },
  tags: {
    items: [],
    status: Status.LOADING,
  },
  post: {
    item: {},
    status: Status.LOADING,
  },
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.items = []
      state.posts.status = Status.LOADING
    })
    builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PostType[]>) => {
      state.posts.items = action.payload
      state.posts.status = Status.LOADED
    })
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.items = []
      state.posts.status = Status.ERROR
    })
    builder.addCase(fetchPost.pending, (state) => {
      state.post.item = {}
      state.post.status = Status.LOADING
    })
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.post.item = action.payload
      state.post.status = Status.LOADED
    })
    builder.addCase(fetchPost.rejected, (state) => {
      state.post.item = {}
      state.post.status = Status.ERROR
    })
    builder.addCase(fetchTags.pending, (state) => {
      state.tags.items = []
      state.tags.status = Status.LOADING
    })
    builder.addCase(fetchTags.fulfilled, (state, action: PayloadAction<Array<string>>) => {
      state.tags.items = action.payload
      state.tags.status = Status.LOADED
    })
    builder.addCase(fetchTags.rejected, (state) => {
      state.tags.items = []
      state.tags.status = Status.ERROR
    })
    builder.addCase(fetchRemovePost.pending, (state, action) => {
      state.posts.items = state.posts.items.filter((obj: PostType) => obj._id !== action.meta.arg)
    })
    builder.addCase(fetchUserPosts.pending, (state) => {
      state.posts.items = []
      state.posts.status = Status.LOADING
    })
    builder.addCase(fetchUserPosts.fulfilled, (state, action: PayloadAction<PostType[]>) => {
      state.posts.items = action.payload
      state.posts.status = Status.LOADED
    })
    builder.addCase(fetchUserPosts.rejected, (state) => {
      state.posts.items = []
      state.posts.status = Status.ERROR
    })
  },
})

export const postItemsSelector = (state: RootState) => state.posts.posts.items

export const postsSelector = (state: RootState) => state.posts.posts

export const postItemSelector = (state: RootState) => state.posts.post.item

export const postSelector = (state: RootState) => state.posts.post

export const postsReducer = postsSlice.reducer
