import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import instance from '../../axios'
import { selectIsAuth } from '../../redux/slices/auth'
import { fetchRegister } from '../../redux/asyncActions'
import { useAppDispatch } from '../../redux/store'
import { LoginData, RegisterParams } from '../../redux/slices/types'

import styles from './Registration.module.scss'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

const Registration = () => {
  const [imageUrl, setImageUrl] = useState('')

  const isAuth = useSelector(selectIsAuth)

  const inputFileRef = useRef(null)

  const router = useRouter()

  const dispatch = useAppDispatch()

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

  const onSubmit = async (values: RegisterParams) => {
    const data = (await dispatch(fetchRegister(values))) as LoginData

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
    <Paper className={styles.wrapper}>
      <Typography className={styles.title} variant='h5'>
        Sign up
      </Typography>
      <div className={styles.avatar}>
        <Avatar
          src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
          sx={{ width: 100, height: 100 }}
        />
      </div>
      <div>
        <Button
          className={styles.avatarInput}
          {...register('avatarUrl', { required: 'Upload avatar' })}
          value={`${process.env.REACT_APP_API_URL}${imageUrl}`}
          onClick={() => inputFileRef.current.click()}
          variant='outlined'
          size='large'>
          Upload photo
        </Button>
        <input ref={inputFileRef} type='file' onChange={handleChangeFile} hidden />
      </div>
      {imageUrl && (
        <>
          <Button
            className={styles.deleteButton}
            variant='contained'
            color='error'
            onClick={onClickRemoveImage}>
            Delete
          </Button>
        </>
      )}
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
        <Button
          className={styles.signUp}
          disabled={!isValid}
          type='submit'
          size='large'
          variant='contained'
          fullWidth>
          Sign up
        </Button>
      </form>
    </Paper>
  )
}

export default Registration
