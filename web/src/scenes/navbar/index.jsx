import {
  useMediaQuery,
  useTheme,
  Typography,
  InputBase,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Box,
} from '@mui/material'
import {
  Search,
  DarkMode,
  LightMode,
  Message,
  Notifications,
  Help,
  Close,
  Menu,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

import { setMode, setLogout } from 'src/state'
import FlexBetween from 'src/components/FlexBetween'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const user = useSelector((state) => state.user)
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')

  const theme = useTheme()
  const backgroundAlt = theme.palette.background.alt
  const neutralLight = theme.palette.neutral.light
  const primary = theme.palette.primary.main
  const primaryDark = theme.palette.primary.dark
  const backgroundDefault = theme.palette.background.default

  const fullName = `${user.firstName} ${user.lastName}`
  const mobileNav = {
    position: 'fixed',
    right: 0,
    bottom: 0,
    height: '100%',
    minWidth: '300px',
    maxWidth: '300px',
    backgroundColor: backgroundDefault,
    zIndex: '10',
  }

  return (
    <FlexBetween padding="1em 6%" backgroundColor={backgroundAlt}>
      <>
        <FlexBetween gap="1.75rem">
          <>
            <Typography
              onClick={() => navigate('/home')}
              sx={{
                fontWeight: 'bold',
                fontSize: 'clamp(1rem, 2rem, 2.25rem)',
                color: primary,
                '&:hover': { color: primaryDark, cursor: 'pointer' },
              }}
            >
              SocialGram
            </Typography>

            {isNonMobileScreens && (
              <FlexBetween
                backgroundColor={neutralLight}
                borderRadius="9px"
                gap="3rem"
                padding=".1rem 1.5rem"
              >
                <>
                  <InputBase placeholder="Search..." />

                  <IconButton>
                    <Search />
                  </IconButton>
                </>
              </FlexBetween>
            )}
          </>
        </FlexBetween>

        {isNonMobileScreens || isMobileMenuToggled ? (
          <Box sx={!isNonMobileScreens ? mobileNav : ''}>
            {!isNonMobileScreens && (
              <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', p: '1rem' }}
              >
                <IconButton
                  onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                  <Close />
                </IconButton>
              </Box>
            )}

            <FlexBetween
              gap={`${isNonMobileScreens ? '2rem' : '3rem'}`}
              flexDirection={`${!isNonMobileScreens && 'column'}`}
              justifyContent={`${!isNonMobileScreens && 'center'}`}
            >
              <>
                <IconButton onClick={() => dispatch(setMode())}>
                  {theme.palette.mode === 'dark' ? (
                    <DarkMode sx={{ fontSize: '25px' }} />
                  ) : (
                    <LightMode sx={{ fontSize: '25px' }} />
                  )}
                </IconButton>

                <Message sx={{ fontSize: '25px' }} />

                <Notifications sx={{ fontSize: '25px' }} />

                <Help sx={{ fontSize: '25px' }} />

                <FormControl variant="standard" value={fullName}>
                  <Select
                    value={fullName}
                    sx={{
                      backgroundColor: neutralLight,
                      width: '150px',
                      borderRadius: '0.25rem',
                      p: '0.25rem 1rem',
                      '& .MuiSvgIcon-root': { pr: '0.25rem', width: '3rem' },
                      '& .MuiSelect-select:focus': {
                        backgroundColor: neutralLight,
                      },
                    }}
                  >
                    <MenuItem value={fullName}>
                      <Typography>{fullName}</Typography>
                    </MenuItem>

                    <MenuItem>
                      <Typography onClick={() => dispatch(setLogout())}>
                        Log out
                      </Typography>
                    </MenuItem>
                  </Select>
                </FormControl>
              </>
            </FlexBetween>
          </Box>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}
      </>
    </FlexBetween>
  )
}
export default Navbar
