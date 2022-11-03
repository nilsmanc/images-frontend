import ImagesGrid from '../../components/ImagesGrid'
import UserInfo from '../../components/UserInfo'
import styles from './Profile.module.scss'

const Profile = () => {
  return (
    <div>
      <UserInfo />
      <ImagesGrid />
    </div>
  )
}

export default Profile
