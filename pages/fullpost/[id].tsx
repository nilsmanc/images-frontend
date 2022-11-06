import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import instance from '../../axios'
import Post from '../../components/Post'

export const getServerSideProps = async (context) => {
  const { id } = context.params
  const response = await fetch(`http://localhost:4444/posts/${id}`)

  const data = await response.json()

  return { props: { image: data } }
}

const FullPost = ({ image }) => {
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    instance
      .get(`posts/${image._id}`)
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.warn(err)
        alert('Error in getting post')
      })
  }, [])

  return (
    <div>
      <Post isLoading={isLoading} imageUrl={image.imageUrl} id={image._id} />
      <Link href={`/editpost/${image._id}`}>Edit</Link>
    </div>
  )
}

export default FullPost
