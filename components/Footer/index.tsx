import Link from 'next/link'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <nav className={styles.wrapper}>
      <div>
        <Link href='/'>Main</Link>
        <Link href='/people'>People</Link>
        <Link href='/settings'>Setting</Link>
        <Link href='/profile'>Profile</Link>
      </div>
    </nav>
  )
}

export default Footer
