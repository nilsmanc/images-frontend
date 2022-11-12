import { createAsyncThunk } from '@reduxjs/toolkit'

import instance from '../axios'

import { CommentType, LoginData, LoginParams, RegisterParams, UserType } from './slices/types'

export const fetchAuth = createAsyncThunk<LoginData, LoginParams>(
  'auth/fetchAuth',
  async (params) => {
    const { data } = await instance.post('/auth/login', params)
    return data
  },
)

export const fetchRegister = createAsyncThunk<LoginData, RegisterParams>(
  'auth/fetchRegister',
  async (params) => {
    const { data } = await instance.post('/auth/register', params)
    return data
  },
)

export const fetchAuthMe = createAsyncThunk<UserType>('auth/fetchAuthMe', async () => {
  const { data } = await instance.get('/auth/me')
  return data
})

export const fetchTags = createAsyncThunk<Array<string>>('posts/fetchTags', async () => {
  const { data } = await instance.get('/tags')
  return data
})

export const fetchRemovePost = createAsyncThunk<void, number>('posts/fetchRemovePost', async (id) =>
  instance.delete(`/posts/${id}`),
)

export const fetchPostComments = createAsyncThunk<CommentType[], number>(
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
