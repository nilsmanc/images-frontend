import { peopleReducer } from './slices/people'
import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth'
import { postsReducer } from './slices/posts'
import { commentsReducer } from './slices/comments'

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    people: peopleReducer,
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
