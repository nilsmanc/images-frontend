import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import ImagesGrid from '../components/ImagesGrid'
import { fetchPosts } from '../redux/asyncActions'
import { postItemsSelector } from '../redux/slices/posts'
import { useAppDispatch } from '../redux/store'

import styles from '../styles/Home.module.scss'

export default function Home() {
  const dispatch = useAppDispatch()

  const posts = useSelector(postItemsSelector)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <div className={styles.container}>
      <ImagesGrid posts={posts} />
    </div>
  )
}
