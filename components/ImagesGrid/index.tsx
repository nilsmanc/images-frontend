import { getImageListItemBarUtilityClass } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { postsSelector } from '../../redux/slices/posts'
import Post from '../Post'
import Button from '@mui/material/Button'
import { fetchRemovePost } from '../../redux/asyncActions'

const ImagesGrid = () => {
  let array = useSelector(postsSelector)
  const dispatch = useDispatch()
  const images = array.posts.items
  console.log(images)
  const clickHandler = (id) => {
    //@ts-ignore
    dispatch(fetchRemovePost(id))
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {images.map((image: any, i: number) => (
          <Grid key={i} item xs={4}>
            <Post imageUrl={image.imageUrl} id={image._id} />
            <Button onClick={() => clickHandler(image._id)}>Delete Post</Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ImagesGrid
