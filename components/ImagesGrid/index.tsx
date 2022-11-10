import { useSelector } from 'react-redux'

import Post from '../Post'
import { postItemsSelector } from '../../redux/slices/posts'
import { PostType } from '../../redux/slices/types'

import styles from './ImagesGrid.module.scss'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

const ImagesGrid = () => {
  const posts = useSelector(postItemsSelector)

  return (
    <div className={styles.paper}>
      <Box className={styles.box} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {posts.map((post: PostType, i: number) => (
            <Grid key={i} item xs={4}>
              <Post imageUrl={post.imageUrl} id={post._id} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}

export default ImagesGrid
