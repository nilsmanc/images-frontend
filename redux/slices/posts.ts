import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchRemovePost, fetchTags } from '../asyncActions'
import { RootState } from '../store'
import { PostType, PostsSliceState, Status } from './types'

const initialState: PostsSliceState = {
  posts: {
    items: [],
  },
  tags: {
    items: [],
    status: Status.LOADING,
  },
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
})

export const postsSelector = (state: RootState) => state.posts

export const postsReducer = postsSlice.reducer
