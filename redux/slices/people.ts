import { RootState } from './../store'
import { createSlice } from '@reduxjs/toolkit'
import { fetchPeople } from '../asyncActions'
import { PeopleSliceState, Status } from './types'

const initialState: PeopleSliceState = {
  items: [],
  status: Status.LOADING,
}

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPeople.pending, (state) => {
      state.items = []
      state.status = Status.LOADING
    })
    builder.addCase(fetchPeople.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.LOADED
    })
    builder.addCase(fetchPeople.rejected, (state) => {
      state.items = []
      state.status = Status.ERROR
    })
  },
})

export const peopleSelector = (state: RootState) => state.people.items

export const peopleReducer = peopleSlice.reducer
