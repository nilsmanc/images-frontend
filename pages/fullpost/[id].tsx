import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import instance from '../../axios'
import Post from '../../components/Post'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useDispatch } from 'react-redux'
import { fetchRemovePost } from '../../redux/asyncActions'

export const getServerSideProps = async (context) => {
  const { id } = context.params
  const response = await fetch(`http://localhost:4444/posts/${id}`)

  const data = await response.json()

  return { props: { image: data } }
}

const FullPost = ({ image }) => {
  console.log('image', image)
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(true)
  const dispatch = useDispatch()

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

  const clickHandler = () => {
    //@ts-ignore
    dispatch(fetchRemovePost(image._id))
  }

  return (
    <div>
      <Post isLoading={isLoading} imageUrl={image.imageUrl} id={image._id} />
      <Typography>{image.description}</Typography>
      <Link href={`/editpost/${image._id}`}>Edit</Link>
      <Button onClick={clickHandler}>Delete post</Button>
    </div>
  )
}

export default FullPost
