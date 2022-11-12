import instance from '../axios'
import ImagesGrid from '../components/ImagesGrid'

import styles from '../styles/Home.module.scss'

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <ImagesGrid posts={posts} />
    </div>
  )
}

export async function getStaticProps(context) {
  const { data } = await instance.get('/posts')

  return {
    props: { posts: data },
  }
}
