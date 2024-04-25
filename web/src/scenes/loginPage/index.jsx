import { useTheme, Box, Typography, useMediaQuery } from '@mui/material'

import Form from './Form'

const LoginPage = () => {
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')

  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          backgroundColor: theme.palette.background.alt,
          padding: '1rem 6%',
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '32px',
            color: theme.palette.primary.main,
          }}
        >
          SocialGram
        </Typography>
      </Box>

      <Box
        sx={{
          width: isNonMobileScreens ? '50%' : '93%',
          backgroundColor: theme.palette.background.alt,
          m: '2rem auto',
          p: '2rem',
          borderRadius: '1.5rem',
        }}
      >
        <Typography
          sx={{
            fontWeight: 500,
            fontVariant: 'h5',
            mb: '1.5rem',
            textAlign: 'center',
          }}
        >
          Welcome to SocioGram, the Social Media for Sociopath!
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}
export default LoginPage
