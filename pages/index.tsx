import instance from '../axios'

import ImagesGrid from '../components/ImagesGrid'

export default function Home({ posts }) {
  return (
    <div>
      <ImagesGrid posts={posts} />
    </div>
  )
}

export async function getServerSideProps() {
  const { data } = await instance.get('/posts')

  return {
    props: { posts: data },
  }
}
