import { createSlice } from '@reduxjs/toolkit'
import { fetchPostComments } from '../asyncActions'

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
  },
})

export const commentsSelector = (state: any) => state.comments

export const commentsReducer = commentsSlice.reducer
