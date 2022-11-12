import { useEffect } from 'react'

import Footer from '../Footer'
import Header from '../Header'
import { fetchAuthMe } from '../../redux/asyncActions'
import { useAppDispatch } from '../../redux/store'
import Head from 'next/head'

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
