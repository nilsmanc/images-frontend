import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAuth, fetchAuthMe, fetchRegister } from '../asyncActions'
import { RootState } from '../store'
import { AuthData, AuthSliceState, Status } from './types'

const initialState: AuthSliceState = {
  data: null,
  status: Status.LOADING,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.status = Status.LOADING
      state.data = null
    })
    builder.addCase(fetchAuth.fulfilled, (state, action: PayloadAction<AuthData>) => {
      state.status = Status.LOADED
      state.data = action.payload
    })
    builder.addCase(fetchAuth.rejected, (state) => {
      state.status = Status.ERROR
      state.data = null
    })
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = Status.LOADING
      state.data = null
    })
    builder.addCase(fetchAuthMe.fulfilled, (state, action: PayloadAction<AuthData>) => {
      state.status = Status.LOADED
      state.data = action.payload
    })
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.status = Status.ERROR
      state.data = null
    })
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = Status.LOADING
      state.data = null
    })
    builder.addCase(fetchRegister.fulfilled, (state, action: PayloadAction<AuthData>) => {
      state.status = Status.LOADED
      state.data = action.payload
    })
    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = Status.ERROR
      state.data = null
    })
  },
})

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data)

export const selectAuthUser = (state: RootState) => state.auth.data

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions
