import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import instance from '../../axios'
import { selectIsAuth } from '../../redux/slices/auth'

import styles from './AddPost.module.scss'
import Link from 'next/link'

const AddPost = () => {
  const router = useRouter()
  const id = router.query

  const isAuth = useSelector(selectIsAuth)
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const inputFileRef = useRef(null)

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append('image', file)
      const { data } = await instance.post('/upload', formData)
      setImageUrl('http://localhost:4444' + data.url)
      console.log(data.url)
    } catch (err) {
      console.warn(err)
      alert('Failed to upload file')
    }
  }

  useEffect(() => {}, [])

  const onClickRemoveImage = () => {
    setImageUrl('')
  }

  const onSubmit = async () => {
    try {
      const fields = {
        description,
        imageUrl,
        tags,
      }
      console.log(fields)

      const { data } = await instance.post('/posts', fields)

      const _id = data._id

      router.push('/')
    } catch (err) {
      console.warn(err)
      alert('Failed to create the post')
    }
  }

  return (
    <Paper>
      <Button onClick={() => inputFileRef.current.click()} variant='outlined' size='large'>
        Upload image
      </Button>
      <input ref={inputFileRef} type='file' onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant='contained' color='error' onClick={onClickRemoveImage}>
            Delete
          </Button>
          <img className={styles.image} src={imageUrl} alt='Uploaded' />
        </>
      )}
      <TextField
        className={styles.description}
        placeholder='Description'
        onChange={(e) => setDescription(e.target.value)}
        variant='standard'
      />
      <TextField
        value={tags}
        placeholder='Tags'
        onChange={(e) => setTags(e.target.value)}
        variant='standard'
      />
      <Button onClick={onSubmit} size='large' variant='contained'>
        Post
      </Button>
      <Link href='/'>
        <Button size='large'>Cancel</Button>
      </Link>
    </Paper>
  )
}

export default AddPost
