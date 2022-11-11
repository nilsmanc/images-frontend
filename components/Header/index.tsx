import { useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'

import { logout, selectAuthUser } from '../../redux/slices/auth'
import { useAppDispatch } from '../../redux/store'

import styles from './Header.module.scss'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import CameraIcon from '@mui/icons-material/Camera'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

function ResponsiveAppBar() {
  const dispatch = useAppDispatch()

  const user = useSelector(selectAuthUser)

  const pages = [
    { name: 'Main', route: '/' },
    { name: 'People', route: '/people' },
  ]

  const settings = [
    { name: 'Sing up', route: `/registration` },
    { name: 'Sign in', route: '/login' },
  ]

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
  }

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position='relative'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Link href='/'>
            <CameraIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} fontSize='large' />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}>
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link href={page.route}>
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page.name}
                </Button>
              </Link>
            ))}
            {user && (
              <Link href={'/addpost'}>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>Add post</Button>
              </Link>
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={user?.avatarUrl} alt='Remy Sharp' />
              </IconButton>
            </Tooltip>
            {user ? (
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                <MenuItem>
                  <Link href={`/profile/${user?._id}`}>
                    <Typography textAlign='center'>
                      <PersonOutlineIcon className={styles.icon} fontSize='small' />
                      Profile
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Typography onClick={logoutHandler}>
                    <LogoutIcon className={styles.icon} fontSize='small' /> Logout
                  </Typography>
                </MenuItem>
              </Menu>
            ) : (
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <Link href={setting.route}>
                      <Typography textAlign='center'>{setting.name}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default ResponsiveAppBar
