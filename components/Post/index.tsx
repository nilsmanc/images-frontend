import Image from 'next/image'
import Link from 'next/link'

const Post = ({ imageUrl, id }) => {
  return (
    <div>
      <Link href={`/fullpost/${id}`}>
        <Image src={imageUrl} alt='a' width={300} height={300} />
      </Link>
    </div>
  )
}

export default Post
