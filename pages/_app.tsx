import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import store from '../redux/store'
import Layout from '../components/Layout'

import '../styles/globals.css'
import styles from '../styles/App.module.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <div className={styles.wrapper}>
          <Component {...pageProps} />
        </div>
      </Layout>
    </Provider>
  )
}
