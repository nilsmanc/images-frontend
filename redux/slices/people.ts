import { createSlice } from '@reduxjs/toolkit'
import { fetchPeople } from '../asyncActions'

const initialState = {
  people: {
    items: [],
    status: 'loading',
  },
}

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPeople.pending, (state) => {
      state.people.items = []
      state.people.status = 'loading'
    })
    builder.addCase(fetchPeople.fulfilled, (state, action) => {
      state.people.items = action.payload
      state.people.status = 'loaded'
    })
    builder.addCase(fetchPeople.rejected, (state) => {
      state.people.items = []
      state.people.status = 'error'
    })
  },
})

export const peopleSelector = (state: any) => state.people

export const peopleReducer = peopleSlice.reducer
