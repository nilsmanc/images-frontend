import Image from 'next/image'

import styles from './UserInfo.module.scss'
import Typography from '@mui/material/Typography'

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
    </div>
  )
}

export default UserInfo
