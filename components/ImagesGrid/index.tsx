import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Image from 'next/image'

const photos = [
  <Image
    src='https://img.freepik.com/free-photo/trees-each-other-forest-covered-by-creeping-mist_181624-16397.jpg'
    alt='fog'
    width={300}
    height={300}
  />,
  <Image
    src='https://img.freepik.com/free-photo/trees-each-other-forest-covered-by-creeping-mist_181624-16397.jpg'
    alt='fog'
    width={300}
    height={300}
  />,
  <Image
    src='https://img.freepik.com/free-photo/trees-each-other-forest-covered-by-creeping-mist_181624-16397.jpg'
    alt='fog'
    width={300}
    height={300}
  />,
  <Image
    src='https://img.freepik.com/free-photo/trees-each-other-forest-covered-by-creeping-mist_181624-16397.jpg'
    alt='fog'
    width={300}
    height={300}
  />,
  <Image
    src='https://img.freepik.com/free-photo/trees-each-other-forest-covered-by-creeping-mist_181624-16397.jpg'
    alt='fog'
    width={300}
    height={300}
  />,
  <Image
    src='https://img.freepik.com/free-photo/trees-each-other-forest-covered-by-creeping-mist_181624-16397.jpg'
    alt='fog'
    width={300}
    height={300}
  />,
]

const ImagesGrid = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {photos.map((photo, i) => (
          <Grid key={i} item xs={4}>
            {photo}
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ImagesGrid
