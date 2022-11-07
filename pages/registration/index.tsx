import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

import styles from './Registration.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/slices/auth'
import { fetchRegister } from '../../redux/asyncActions'
import { useRouter } from 'next/router'
import axios from 'axios'
import instance from '../../axios'

const Registration = () => {
  const [imageUrl, setImageUrl] = useState('')
  const inputFileRef = useRef(null)
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      avatarUrl: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (values: any) => {
    //@ts-ignore
    const data = await dispatch(fetchRegister(values))

    if (!data.payload) {
      return alert('Failed to register')
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }

  const onClickRemoveImage = () => {
    setImageUrl('')
  }

  if (isAuth) {
    router.push('/')
  }

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append('image', file)
      const { data } = await instance.post('/upload', formData)
      setImageUrl(data.url)
    } catch (err) {
      console.warn(err)
      alert('Failed to upload file')
    }
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant='h5'>
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Enter name' })}
          className={styles.field}
          label='Full name'
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type='email'
          {...register('email', { required: 'Enter email' })}
          className={styles.field}
          label='E-Mail'
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type='password'
          {...register('password', { required: 'Enter password' })}
          className={styles.field}
          label='Password'
          fullWidth
        />

        <div>
          <Button onClick={() => inputFileRef.current.click()} variant='outlined' size='large'>
            Загрузить аватар
          </Button>
          <input ref={inputFileRef} type='file' onChange={handleChangeFile} hidden />
        </div>
        <input
          {...register('avatarUrl', { required: 'Upload avatar' })}
          value={`http://localhost:4444${imageUrl}`}
        />
        <Button disabled={!isValid} type='submit' size='large' variant='contained' fullWidth>
          Зарегистрироваться
        </Button>
        {imageUrl && (
          <>
            <Button variant='contained' color='error' onClick={onClickRemoveImage}>
              Удалить
            </Button>
            <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt='Uploaded' />
          </>
        )}
      </form>
    </Paper>
  )
}

export default Registration
