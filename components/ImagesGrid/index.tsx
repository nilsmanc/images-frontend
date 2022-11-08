import { useSelector } from 'react-redux'

import { postItemsSelector } from '../../redux/slices/posts'
import Post from '../Post'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { PostType } from '../../redux/slices/types'

const ImagesGrid = () => {
  const posts = useSelector(postItemsSelector)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {posts.map((post: PostType, i: number) => (
          <Grid key={i} item xs={4}>
            <Post imageUrl={post.imageUrl} id={post._id} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ImagesGrid
