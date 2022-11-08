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
  items: CommentType[]
  status: Status
}

export type CommentType = {
  _id: string | number
  text: string
  likes: number
  user: UserType
  post: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface PeopleSliceState {
  items: UserType[]
  status: Status
}

export type UserType = {
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
    items: PostType[]
    status: Status
  }
  tags: {
    items: Array<string>
    status: Status
  }
}

export type PostType = {
  _id: string | number
  imageUrl: string
  description: string
  tags: Array<string>
  viewsCount: number
  likes: number
  user: UserType
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

export interface LoginData {
  meta: {
    arg: LoginParams | RegisterParams
    requestId: string
    requestStatus: string
  }
  payload: {
    avatarUrl: string
    createdAt: string
    email: string
    fullName: string
    token: string
    updatedAt: string
    __v: number
    _id: string
  }
  type: string
}
