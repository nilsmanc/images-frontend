import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { fetchRemovePost } from '../../redux/asyncActions'

const Post = ({ isLoading, imageUrl, id }: any) => {
  const dispatch = useDispatch()
  if (isLoading) {
    return <div>Skeleton</div>
  }

  const onClickRemove = () => {
    if (window.confirm('Are you sure you want to delete post?')) {
      //@ts-ignore
      dispatch(fetchRemovePost(postId))
    }
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
