import Typography from '@mui/material/Typography'
import Image from 'next/image'

import styles from './UserInfo.module.scss'

const UserInfo = () => {
  return (
    <div className={styles.wrapper}>
      <Typography className={styles.name}>Name</Typography>
      <Image
        src='https://img.freepik.com/free-photo/trees-each-other-forest-covered-by-creeping-mist_181624-16397.jpg'
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
