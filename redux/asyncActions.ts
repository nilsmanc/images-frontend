import { createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../axios'
import { Comment, LoginParams, Post, RegisterParams, User } from './slices/types'

export const fetchAuth = createAsyncThunk<any, LoginParams>('auth/fetchAuth', async (params) => {
  const { data } = await instance.post('/auth/login', params)
  return data
})

export const fetchRegister = createAsyncThunk<any, RegisterParams>(
  'auth/fetchRegister',
  async (params) => {
    const { data } = await instance.post('/auth/register', params)
    return data
  },
)

export const fetchAuthMe = createAsyncThunk<User>('auth/fetchAuthMe', async () => {
  const { data } = await instance.get('/auth/me')
  return data
})

export const fetchPosts = createAsyncThunk<Post[]>('posts/fetchPosts', async () => {
  const { data } = await instance.get('/posts')
  return data
})

export const fetchTags = createAsyncThunk<Array<string>>('posts/fetchTags', async () => {
  const { data } = await instance.get('/tags')
  return data
})

export const fetchRemovePost = createAsyncThunk<void, number>('posts/fetchRemovePost', async (id) =>
  instance.delete(`/posts/${id}`),
)

export const fetchPeople = createAsyncThunk<User[]>('people/fetchPeople', async () => {
  const { data } = await instance.get('/users')
  return data
})

export const fetchUserPosts = createAsyncThunk<Post[], number>(
  'posts/fetchUserPosts',
  async (id) => {
    const { data } = await instance.get(`/posts/user/${id}`)
    return data
  },
)

export const fetchPostComments = createAsyncThunk<Comment[], number>(
  'comments/fetchPostComments',
  async (id) => {
    const { data } = await instance.get(`/comments/${id}`)
    return data
  },
)

export const fetchRemoveComment = createAsyncThunk<void, number>(
  'comments/fetchRemoveComment',
  async (id) => instance.delete(`/comments/${id}`),
)
