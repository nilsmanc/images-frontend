import Image from 'next/image'
import Link from 'next/link'

const Post = ({ isLoading, imageUrl, id }) => {
  if (isLoading) {
    return <div>Skeleton</div>
  }

  return (
    <div>
      <Link href={`/fullpost/${id}`}>
        <Image src={imageUrl} alt='a' width={300} height={300} />
      </Link>
    </div>
  )
}

export default Post
