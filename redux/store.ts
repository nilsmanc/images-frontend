import { peopleReducer } from './slices/people'
import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth'
import { postsReducer } from './slices/posts'

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    people: peopleReducer,
  },
})

export default store
