import Image from 'next/image'

import styles from './UserInfo.module.scss'
import Typography from '@mui/material/Typography'

const UserInfo = ({ person }) => {
  return (
    <div className={styles.wrapper}>
      <Typography className={styles.name}>{person.fullName}</Typography>
      {person.avatarUrl ? (
        <Image
          src={person.avatarUrl}
          alt='avatar'
          width={300}
          height={300}
          className={styles.avatar}
        />
      ) : (
        <div className={styles.skeleton}></div>
      )}
    </div>
  )
}

export default UserInfo
