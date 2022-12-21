import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { useRouter } from 'next/router'

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
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'

const FullPost = ({ post }) => {
  const [commentText, setCommentText] = useState('')

  const dispatch = useAppDispatch()

  const router = useRouter()

  const comments = useSelector(commentsSelector)
  const user = useSelector(selectAuthUser)

  const isEditable = Boolean(user?._id === post.user._id)

  useEffect(() => {
    dispatch(fetchPostComments(post._id))
  }, [])

  const deleteHandler = () => {
    dispatch(fetchRemovePost(post._id))

    router.push(`/profile/${user._id}`)
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
    <div>
      {post.imageUrl && (
        <div className={styles.wrapper}>
          <Image
            className={styles.image}
            src={post.imageUrl}
            alt='image'
            width={600}
            height={600}
            priority={true}
          />
          <Typography className={styles.viewsCount}>
            <RemoveRedEyeOutlinedIcon className={styles.eyeIcon} fontSize='small' />
            {post.viewsCount}
          </Typography>
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
              <CommentItem key={comment._id} comment={comment} user={user} />
            ))}
          </div>
          <div className={styles.commentButtons}>
            <TextField
              className={styles.commentInput}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button className={styles.sendButton} onClick={sendHandler}>
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FullPost

export const getServerSideProps = async ({ params }) => {
  const { id } = params

  const { data } = await instance.get(`/posts/${id}`)

  return { props: { post: data } }
}
