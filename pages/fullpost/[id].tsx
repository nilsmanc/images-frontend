import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Image from 'next/image'

import instance from '../../axios'
import { commentsSelector } from '../../redux/slices/comments'
import { selectAuthUser } from '../../redux/slices/auth'
import { fetchPostComments, fetchRemovePost } from '../../redux/asyncActions'
import CommentItem from '../../components/CommentItem'

import styles from './FullPost.module.scss'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material'
import { useAppDispatch } from '../../redux/store'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useRouter } from 'next/router'

export const getServerSideProps = async (context) => {
  const { id } = context.params

  const response = await fetch(`http://localhost:4444/posts/${id}`)

  const data = await response.json()

  return { props: { post: data } }
}

const FullPost = ({ post }) => {
  const comments = useSelector(commentsSelector)
  const user = useSelector(selectAuthUser)

  const router = useRouter()

  const [commentText, setCommentText] = useState('')

  const dispatch = useAppDispatch()

  const isEditable = Boolean(user?._id === post.user._id)

  useEffect(() => {
    instance.get(`posts/${post._id}`).catch((err) => {
      console.warn(err)
      alert('Error in getting post')
    })
    dispatch(fetchPostComments(post._id))
  }, [])

  const deleteHandler = () => {
    dispatch(fetchRemovePost(post._id))

    router.push('/')
  }

  const changeTextHandler = () => {
    const text = (document.getElementById('commentField') as HTMLInputElement).value
    setCommentText(text)
  }

  const sendHandler = async () => {
    try {
      const postId = post._id
      const text = commentText

      const comment = {
        text,
        postId,
      }

      const commentsArea = document.getElementById('comments')

      await instance.post('/comments', comment)

      dispatch(fetchPostComments(post._id))

      setCommentText('')

      commentsArea.scroll({
        top: commentsArea.scrollHeight,
        behavior: 'smooth',
      })
    } catch (err) {
      console.warn(err)
      alert('Failed to post the comment')
    }
  }

  return (
    <div className={styles.wrapper}>
      <Image className={styles.image} src={post.imageUrl} alt='image' width={600} height={600} />
      <div className={styles.description}>
        <Typography className={styles.text}>{post.description}</Typography>
        <div className={styles.postButtons}>
          {isEditable && (
            <div>
              <Button onClick={deleteHandler}>
                <DeleteIcon color='action' />
              </Button>
              <Link href={`/editpost/${post._id}`}>
                <Button>
                  <EditIcon color='action' />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className={styles.commentItems} id='comments'>
        {comments?.map((comment) => (
          <CommentItem comment={comment} user={user} />
        ))}
      </div>
      <div className={styles.commentButtons}>
        <TextField
          className={styles.commentInput}
          id='commentField'
          value={commentText}
          onChange={changeTextHandler}
        />
        <Button className={styles.sendButton} onClick={sendHandler}>
          Send
        </Button>
      </div>
    </div>
  )
}

export default FullPost
