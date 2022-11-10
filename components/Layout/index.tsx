import { useEffect } from 'react'

import Footer from '../Footer'
import Header from '../Header'
import { fetchAuthMe } from '../../redux/asyncActions'
import { useAppDispatch } from '../../redux/store'

const Layout = ({ children }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout
