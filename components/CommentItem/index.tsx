import { fetchRemoveComment } from '../../redux/asyncActions'
import { useAppDispatch } from '../../redux/store'

import styles from './CommentItem.module.scss'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'

const CommentItem = ({ comment, user }) => {
  const dispatch = useAppDispatch()

  const deleteHandler = async (id) => {
    dispatch(fetchRemoveComment(id))
  }

  return (
    <div className={styles.commentItem}>
      <Typography className={styles.name}>
        <b>{comment.user?.fullName}</b>
      </Typography>
      <Typography className={styles.text}>{comment.text}</Typography>
      <img className={styles.avatar} src={comment.user?.avatarUrl} />
      {user?._id === comment.user?._id && (
        <Button className={styles.deleteButton} onClick={() => deleteHandler(comment._id)}>
          <DeleteIcon color='action' fontSize='small' />
        </Button>
      )}
    </div>
  )
}

export default CommentItem
