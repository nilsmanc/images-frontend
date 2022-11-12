import { createSlice } from '@reduxjs/toolkit'
import { PeopleSliceState, Status } from './types'

const initialState: PeopleSliceState = {
  items: [],
  status: Status.LOADING,
}

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
})

export const peopleReducer = peopleSlice.reducer
