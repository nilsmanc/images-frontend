import { useDispatch } from 'react-redux'
import Footer from '../Footer'
import Header from '../Header'

import { useEffect } from 'react'
import { fetchAuthMe } from '../../redux/slices/asyncActions'

const Layout = ({ children }: any) => {
  const dispatch = useDispatch()
  useEffect(() => {
    //@ts-ignore
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
