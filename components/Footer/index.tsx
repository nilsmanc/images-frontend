import Link from 'next/link'
import { useSelector } from 'react-redux'

import { logout, selectAuthUser } from '../../redux/slices/auth'
import { useAppDispatch } from '../../redux/store'

import styles from './Footer.module.scss'

const Footer = () => {
  const user = useSelector(selectAuthUser)
  const id = user?._id
  const dispatch = useAppDispatch()
  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
  }

  return (
    <nav className={styles.wrapper}>
      <div>
        <Link href='/'>Main</Link>
        <Link href='/people'>People</Link>
        <Link href='/settings'>Setting</Link>
        <Link href={`/profile/${id}`}>Profile</Link>
        <Link href='/login'>Login</Link>
        <Link href='/registration'>Registration</Link>
        <Link href='/addpost'>Add post</Link>
        <Link href='/editpost'>Edit post</Link>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </nav>
  )
}

export default Footer
