import { useEffect } from 'react'
import Head from 'next/head'

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
      <Head>
        <meta content='images'></meta>
        <title>Images</title>
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout
