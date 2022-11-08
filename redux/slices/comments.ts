import { createSlice } from '@reduxjs/toolkit'
import { fetchPostComments, fetchRemoveComment } from '../asyncActions'

const initialState = {
  comments: {
    items: [],
    status: 'loading',
  },
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostComments.pending, (state) => {
      state.comments.items = []
      state.comments.status = 'loading'
    })
    builder.addCase(fetchPostComments.fulfilled, (state, action) => {
      state.comments.items = action.payload
      state.comments.status = 'loaded'
    })
    builder.addCase(fetchPostComments.rejected, (state) => {
      state.comments.items = []
      state.comments.status = 'error'
    })
    builder.addCase(fetchRemoveComment.pending, (state, action) => {
      state.comments.items = state.comments.items.filter((obj: any) => obj._id !== action.meta.arg)
    })
  },
})

export const commentsSelector = (state: any) => state.comments

export const commentsReducer = commentsSlice.reducer
