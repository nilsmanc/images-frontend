import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import instance from '../axios'

export const fetchAuth = createAsyncThunk<any, any>('auth/fetchAuth', async (params) => {
  const { data } = await instance.post('/auth/login', params)
  return data
})

export const fetchRegister = createAsyncThunk<any, any>('auth/fetchRegister', async (params) => {
  const { data } = await instance.post('/auth/register', params)
  return data
})

export const fetchAuthMe = createAsyncThunk<any, any>('auth/fetchAuthMe', async () => {
  const { data } = await instance.get('/auth/me')
  return data
})

export const fetchPosts = createAsyncThunk<any, any>('posts/fetchPosts', async () => {
  const { data } = await instance.get('/posts')
  return data
})

export const fetchTags = createAsyncThunk<any, any>('posts/fetchTags', async () => {
  const { data } = await instance.get('/tags')
  return data
})

export const fetchRemovePost = createAsyncThunk<any, any>('posts/fetchRemovePost', async (id) =>
  instance.delete(`/posts/${id}`),
)

export const fetchPeople = createAsyncThunk<any, any>('people/fetchPeople', async () => {
  const { data } = await instance.get('/users')
  return data
})

export const fetchUserPosts = createAsyncThunk<any, any>('posts/fetchUserPosts', async (id) => {
  const { data } = await instance.get(`/posts/user/${id}`)
  return data
})

export const fetchPostComments = createAsyncThunk<any, any>(
  'comments/fetchPostComments',
  async (id) => {
    const { data } = await instance.get(`/comments/${id}`)
    return data
  },
)

export const fetchRemoveComment = createAsyncThunk<any, any>(
  'comments/fetchRemoveComment',
  async (id) => instance.delete(`/comments/${id}`),
)
