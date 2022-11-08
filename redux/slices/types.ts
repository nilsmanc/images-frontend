export enum Status {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
}

export interface AuthSliceState {
  data: AuthData | null
  status: Status
}

export type AuthData = {
  _id: string
  fullName: string
  email: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface CommentSliceState {
  items: Comment[]
  status: Status
}

export type Comment = {
  _id: string
  text: string
  likes: number
  user: User
  post: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface PeopleSliceState {
  items: User[]
  status: Status
}

export type User = {
  _id: string
  fullName: string
  email: string
  passwordHash: string
  avatarUrl: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface PostsSliceState {
  posts: {
    items: Post[]
    status: Status
  }
  tags: {
    items: Array<string>
    status: Status
  }
}

export type Post = {
  _id: string
  imageUrl: string
  description: string
  tags: Array<string>
  viewsCount: number
  likes: number
  user: User
  createdAt: string
  updatedAt: string
  __v: number
}

export type LoginParams = {
  email: string
  password: string
}

export type RegisterParams = {
  fullName: string
  email: string
  password: string
  avatarUrl: string
}
