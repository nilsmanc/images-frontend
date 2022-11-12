import Post from '../Post'
import { PostType } from '../../redux/slices/types'

import styles from './ImagesGrid.module.scss'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

const ImagesGrid = ({ posts }) => {
  return (
    <div className={styles.paper}>
      <Box className={styles.box}>
        <Grid container>
          {posts.map((post: PostType, i: number) => (
            <Grid item key={i} xs={12} sm={12} md={6} lg={4}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}

export default ImagesGrid
