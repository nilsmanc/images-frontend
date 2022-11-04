import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import instance from '../../axios'
import Post from '../../components/Post'

const FullPost = () => {
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(true)

  const router = useRouter()
  const { pid } = router.query

  useEffect(() => {
    instance
      .get(`posts/${pid}`)
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.warn(err)
        alert('Error in getting post')
      })
  }, [])

  if (isLoading) {
    return <Post isLoading={isLoading} />
  }
}

export default FullPost
