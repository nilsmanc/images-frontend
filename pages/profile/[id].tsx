import ImagesGrid from '../../components/ImagesGrid'
import UserInfo from '../../components/UserInfo'
import { useEffect } from 'react'
import styles from './Profile.module.scss'
import { fetchPosts, fetchTags, fetchUserPosts } from '../../redux/asyncActions'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

export const getServerSideProps = async (context) => {
  const { id } = context.params
  const response = await fetch(`http://localhost:4444/users/${id}`)

  const data = await response.json()

  return { props: { person: data } }
}

const Profile = ({ person }) => {
  console.log(person._id)
  const dispatch = useDispatch()
  useEffect(() => {
    //@ts-ignore
    dispatch(fetchUserPosts(person._id))
    //@ts-ignore
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
