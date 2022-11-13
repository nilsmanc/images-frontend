import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import UserInfo from '../../components/UserInfo'
import ImagesGrid from '../../components/ImagesGrid'
import { personSelector } from '../../redux/slices/people'
import { postItemsSelector } from '../../redux/slices/posts'

import styles from './Profile.module.scss'
import Paper from '@mui/material/Paper'
import { useAppDispatch } from '../../redux/store'
import { fetchPerson, fetchUserPosts } from '../../redux/asyncActions'

const Profile = () => {
  const dispatch = useAppDispatch()

  const router = useRouter()
  const params = router.query
  const id = params.id

  const user = useSelector(personSelector)
  const posts = useSelector(postItemsSelector)

  useEffect(() => {
    if (router.isReady) dispatch(fetchPerson(id))
    dispatch(fetchUserPosts(id))
  }, [router.isReady])

  return (
    <div>
      <Paper className={styles.infoPaper}>
        <UserInfo person={user} />
      </Paper>
      <ImagesGrid posts={posts} />
    </div>
  )
}

export default Profile
