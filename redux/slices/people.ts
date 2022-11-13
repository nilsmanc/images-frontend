import { createSlice } from '@reduxjs/toolkit'

import { RootState } from './../store'
import { fetchPeople, fetchPerson } from '../asyncActions'
import { PeopleSliceState, Status } from './types'

const initialState: PeopleSliceState = {
  people: { items: [], status: Status.LOADING },
  person: { item: [], status: Status.LOADING },
}

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPeople.pending, (state) => {
      state.people.items = []
      state.people.status = Status.LOADING
    })
    builder.addCase(fetchPeople.fulfilled, (state, action) => {
      state.people.items = action.payload
      state.people.status = Status.LOADED
    })
    builder.addCase(fetchPeople.rejected, (state) => {
      state.people.items = []
      state.people.status = Status.ERROR
    })
    builder.addCase(fetchPerson.pending, (state) => {
      state.person.item = []
      state.person.status = Status.LOADING
    })
    builder.addCase(fetchPerson.fulfilled, (state, action) => {
      state.person.item = action.payload
      state.person.status = Status.LOADED
    })
    builder.addCase(fetchPerson.rejected, (state) => {
      state.person.item = []
      state.person.status = Status.ERROR
    })
  },
})

export const peopleSelector = (state: RootState) => state.people.people.items

export const personSelector = (state: RootState) => state.people.person.item

export const peopleReducer = peopleSlice.reducer
