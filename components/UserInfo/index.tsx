import Typography from '@mui/material/Typography'
import Image from 'next/image'

import styles from './UserInfo.module.scss'

const UserInfo = ({ person }) => {
  return (
    <div className={styles.wrapper}>
      <Typography className={styles.name}>{person.fullName}</Typography>
      <Image
        src={person.avatarUrl}
        alt='avatar'
        width={300}
        height={300}
        className={styles.avatar}
      />
      <Typography className={styles.bio}>Bio</Typography>
    </div>
  )
}

export default UserInfo
