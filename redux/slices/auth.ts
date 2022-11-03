import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,
  status: 'loading',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
    },
  },
})

export const selectIsAuth = (state: any) => Boolean(state.auth.data)

export const authReducer = authSlice.reducer
