import { useSelector } from 'react-redux'

import { postsSelector } from '../../redux/slices/posts'
import Post from '../Post'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

const ImagesGrid = () => {
  let array = useSelector(postsSelector)
  const images = array.posts.items

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {images.map((image: any, i: number) => (
          <Grid key={i} item xs={4}>
            <Post imageUrl={image.imageUrl} id={image._id} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ImagesGrid
