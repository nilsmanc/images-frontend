import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import ImagesGrid from '../components/ImagesGrid'
import { fetchPosts } from '../redux/asyncActions'
import { postItemsSelector } from '../redux/slices/posts'
import { useAppDispatch } from '../redux/store'

export default function Home() {
  const dispatch = useAppDispatch()

  const posts = useSelector(postItemsSelector)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <div>
      <ImagesGrid posts={posts} />
    </div>
  )
}
