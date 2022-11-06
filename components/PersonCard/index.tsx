import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

import styles from './PersonCard.module.scss'

const PersonCard = ({ item, avatar }) => {
  return (
    <Link href={`/profile/${item._id}`}>
      <div className={styles.userItem}>
        <Avatar alt='avatar' src={avatar} />
        <Typography className={styles.name}>{item.fullName}</Typography>
      </div>
    </Link>
  )
}

export default PersonCard
