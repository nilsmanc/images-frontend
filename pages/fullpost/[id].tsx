import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import instance from '../../axios'
import Post from '../../components/Post'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuthMe, fetchPostComments, fetchRemovePost } from '../../redux/asyncActions'
import { TextField } from '@mui/material'

import styles from './FullPost.module.scss'
import { commentsSelector } from '../../redux/slices/comments'

export const getServerSideProps = async (context) => {
  const { id } = context.params
  const response = await fetch(`http://localhost:4444/posts/${id}`)

  const data = await response.json()

  return { props: { image: data } }
}

const FullPost = ({ image }) => {
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(true)
  const array = useSelector(commentsSelector)
  const comments = array.comments.items.data

  const dispatch = useDispatch()

  useEffect(() => {
    instance
      .get(`posts/${image._id}`)
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.warn(err)
        alert('Error in getting post')
      })
    //@ts-ignore
    dispatch(fetchPostComments(image._id))
  }, [])

  const clickHandler = () => {
    //@ts-ignore
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
      //@ts-ignore
      dispatch(fetchPostComments(image._id))
    } catch (err) {
      console.warn(err)
      alert('Failed to post the comment')
    }
  }
  console.log(comments)
  return (
    <div>
      <Post isLoading={isLoading} imageUrl={image.imageUrl} id={image._id} />
      <Typography>{image.description}</Typography>
      <Link href={`/editpost/${image._id}`}>Edit</Link>
      <TextField id='commentField' />
      {comments?.map((comment) => {
        return (
          <div>
            <Typography>
              <b>{comment.user?.fullName}</b>
            </Typography>
            <Typography>{comment.text}</Typography>
            <img className={styles.image} src={comment.user?.avatarUrl} />
          </div>
        )
      })}
      <Button onClick={sendHandler}>Send</Button>
      <Button onClick={clickHandler}>Delete post</Button>
    </div>
  )
}

export default FullPost
