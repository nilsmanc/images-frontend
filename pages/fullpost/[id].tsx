import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import instance from '../../axios'
import Post from '../../components/Post'
import { commentsSelector } from '../../redux/slices/comments'
import { selectAuthUser } from '../../redux/slices/auth'
import { fetchPostComments, fetchRemoveComment, fetchRemovePost } from '../../redux/asyncActions'

import styles from './FullPost.module.scss'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material'
import { useAppDispatch } from '../../redux/store'

export const getServerSideProps = async (context) => {
  const { id } = context.params
  const response = await fetch(`http://localhost:4444/posts/${id}`)

  const data = await response.json()

  return { props: { image: data } }
}

const FullPost = ({ image }) => {
  const [isLoading, setLoading] = useState(true)
  const comments = useSelector(commentsSelector)
  const user = useSelector(selectAuthUser)

  const dispatch = useAppDispatch()

  const isEditable = Boolean(user?._id === image.user._id)

  useEffect(() => {
    instance
      .get(`posts/${image._id}`)
      .then(() => {
        setLoading(false)
      })
      .catch((err) => {
        console.warn(err)
        alert('Error in getting post')
      })
    dispatch(fetchPostComments(image._id))
  }, [])

  const clickHandler = () => {
    dispatch(fetchRemovePost(image._id))
  }

  const sendHandler = async () => {
    try {
      const text = (document.getElementById('commentField') as HTMLInputElement).value
      const postId = image._id

      const comment = {
        text,
        postId,
      }

      await instance.post('/comments', comment)
      dispatch(fetchPostComments(image._id))
    } catch (err) {
      console.warn(err)
      alert('Failed to post the comment')
    }
  }

  const deleteHandler = async (id) => {
    dispatch(fetchRemoveComment(id))
  }

  return (
    <div>
      <Post isLoading={isLoading} imageUrl={image.imageUrl} id={image._id} />
      <Typography>{image.description}</Typography>

      <TextField id='commentField' />
      {comments?.map((comment) => {
        return (
          <div>
            <Typography>
              <b>{comment.user?.fullName}</b>
            </Typography>
            <Typography>{comment.text}</Typography>
            <img className={styles.image} src={comment.user?.avatarUrl} />
            {/* @ts-ignore */}
            {user?._id === comment.user?._id && (
              <Button onClick={() => deleteHandler(comment._id)}>Delete comment</Button>
            )}
          </div>
        )
      })}
      <Button onClick={sendHandler}>Send</Button>
      {isEditable && (
        <div>
          <Button onClick={clickHandler}>Delete post</Button>
          <Link href={`/editpost/${image._id}`}>Edit</Link>
        </div>
      )}
    </div>
  )
}

export default FullPost
