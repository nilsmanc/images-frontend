import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchPostComments, fetchRemoveComment } from '../asyncActions'
import { RootState } from '../store'
import { CommentSliceState, Status } from './types'

const initialState: CommentSliceState = {
  items: [],
  status: Status.LOADING,
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostComments.pending, (state) => {
      state.items = []
      state.status = Status.LOADING
    })
    builder.addCase(fetchPostComments.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.LOADED
    })
    builder.addCase(fetchPostComments.rejected, (state) => {
      state.items = []
      state.status = Status.ERROR
    })
    builder.addCase(fetchRemoveComment.pending, (state, action) => {
      state.items = state.items.filter((obj: any) => obj._id !== action.meta.arg)
    })
  },
})

export const commentsSelector = (state: RootState) => state.comments.items

export const commentsReducer = commentsSlice.reducer
