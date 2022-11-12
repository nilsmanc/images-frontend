import Link from 'next/link'

import styles from './PersonCard.module.scss'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

const PersonCard = ({ user }) => {
  return (
    <Link href={`/profile/${user._id}`}>
      <div className={styles.userItem}>
        <Avatar className={styles.avatar} alt='avatar' src={user.avatarUrl} />
        <Typography className={styles.name}>{user.fullName}</Typography>
      </div>
    </Link>
  )
}

export default PersonCard
