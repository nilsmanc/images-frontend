import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import instance from '../../axios'

import styles from './EditPost.module.scss'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

const AddPost = () => {
  const router = useRouter()

  const params = router.query
  const id = params.id

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

      setImageUrl('https://images-zjx1.onrender.com' + data.url)
    } catch (err) {
      console.warn(err)
      alert('Failed to upload file')
    }
  }

  useEffect(() => {
    instance(`/posts/${id}`)
      .then(({ data }) => {
        console.log(data)
        setDescription(data.description)
        setImageUrl(data.imageUrl)
        setTags(data.tags.join(','))
      })
      .catch((err) => {
        console.warn(err)
        alert('Error in getting post')
      })
  }, [])

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

      await instance.patch(`/posts/${id}`, fields)
      console.log(fields)

      router.push('/')
    } catch (err) {
      console.warn(err)
      alert('Failed to create the post')
    }
  }

  return (
    <Paper className={styles.wrapper}>
      <Button
        className={styles.upload}
        onClick={() => inputFileRef.current.click()}
        variant='outlined'
        size='large'>
        Upload image
      </Button>
      <input ref={inputFileRef} type='file' onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <img className={styles.preview} src={imageUrl} alt='Uploaded' />
          <Button
            className={styles.delete}
            variant='contained'
            color='error'
            onClick={onClickRemoveImage}>
            Delete
          </Button>
        </>
      )}
      <TextField
        className={styles.description}
        value={description}
        placeholder='Description'
        onChange={(e) => setDescription(e.target.value)}
        variant='standard'
      />
      <TextField
        className={styles.tags}
        value={tags}
        placeholder='Tags'
        onChange={(e) => setTags(e.target.value)}
        variant='standard'
      />
      <Button onClick={onSubmit} size='large' variant='contained'>
        Save
      </Button>
      <Link className={styles.cancel} href='/'>
        <Button size='large'>Cancel</Button>
      </Link>
    </Paper>
  )
}

export default AddPost
