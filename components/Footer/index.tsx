import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectId } from '../../redux/slices/auth'
import styles from './Footer.module.scss'

const Footer = () => {
  const dispatch = useDispatch()
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
        <Link href={`/profile`}>Profile</Link>
        <Link href='/login'>Login</Link>
        <Link href='/registration'>Registration</Link>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </nav>
  )
}

export default Footer
