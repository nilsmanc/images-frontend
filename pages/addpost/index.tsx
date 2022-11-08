import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import instance from '../../axios'

import styles from './AddPost.module.scss'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

const AddPost = () => {
  const router = useRouter()

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
    } catch (err) {
      console.warn(err)
      alert('Failed to upload file')
    }
  }

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

      await instance.post('/posts', fields)

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
