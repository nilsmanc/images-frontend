import { useEffect } from 'react'

import ImagesGrid from '../../components/ImagesGrid'
import UserInfo from '../../components/UserInfo'
import { fetchTags, fetchUserPosts } from '../../redux/asyncActions'
import { useAppDispatch } from '../../redux/store'

import styles from './Profile.module.scss'

export const getServerSideProps = async (context) => {
  const { id } = context.params
  const response = await fetch(`http://localhost:4444/users/${id}`)

  const data = await response.json()

  return { props: { person: data } }
}

const Profile = ({ person }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchUserPosts(person._id))
    dispatch(fetchTags())
  }, [])
  return (
    <div>
      <UserInfo person={person} />
      <ImagesGrid />
    </div>
  )
}

export default Profile
