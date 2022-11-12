import UserInfo from '../../components/UserInfo'
import ImagesGrid from '../../components/ImagesGrid'
import instance from '../../axios'

import styles from './Profile.module.scss'
import Paper from '@mui/material/Paper'

const Profile = ({ user, posts }) => {
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

export const getServerSideProps = async ({ params }) => {
  const { id } = params

  const [user, posts] = await Promise.all([
    instance.get(`/users/${id}`).then((res) => res.data),
    instance.get(`/posts/user/${id}`).then((res) => res.data),
  ])

  return { props: { user, posts } }
}
