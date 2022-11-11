import Image from 'next/image'
import Link from 'next/link'

import styles from './Post.module.scss'

const Post = ({ imageUrl, id }) => {
  return (
    <div>
      <Link href={`/fullpost/${id}`}>
        <Image className={styles.image} src={imageUrl} alt='a' width={300} height={300} />
      </Link>
    </div>
  )
}

export default Post
