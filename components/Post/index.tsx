import Image from 'next/image'
import Link from 'next/link'

import styles from './Post.module.scss'

const Post = ({ post }) => {
  return (
    <div>
      <Link href={`/fullpost/${post._id}`}>
        <Image className={styles.image} src={post.imageUrl} alt='image' width={300} height={300} />
      </Link>
    </div>
  )
}

export default Post
