import React from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { selectIsAuth } from '../../redux/slices/auth'
import { fetchAuth } from '../../redux/asyncActions'

import styles from './Login.module.scss'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useAppDispatch } from '../../redux/store'

const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (values: any) => {
    const data = await dispatch(fetchAuth(values))
    console.log(data)

    if (!data.payload) {
      return alert('Не удалось авторизоваться')
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  if (isAuth) {
    router.push('/')
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant='h5'>
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label='E-Mail'
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type='email'
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label='Пароль'
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
          fullWidth
        />
        <Button disabled={!isValid} type='submit' size='large' variant='contained' fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  )
}

export default Login
