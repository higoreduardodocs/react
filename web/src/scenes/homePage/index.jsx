import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux'

import Navbar from 'src/scenes/navbar'
import UserWidget from 'src/widgets/UserWidget'
import MyPostWidget from 'src/widgets/MyPostWidget'
import AdvertWidget from 'src/widgets/AdvertWidget'
import PostsWidget from 'src/widgets/PostsWidget'
import FriendListWidget from 'src/widgets/FriendListWidget'

const HomePage = () => {
  const user = useSelector((state) => state.user)
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px')

  return (
    <Box>
      <Navbar />

      <Box
        sx={{
          width: '100%',
          padding: '2rem 6%',
          display: isNonMobileScreens ? 'flex' : 'block',
          gap: '0.5rem',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ flexBasis: isNonMobileScreens ? '26%' : undefined }}>
          <UserWidget userId={user._id} picturePath={user.picturePath} />
        </Box>

        <Box
          sx={{
            flexBasis: isNonMobileScreens ? '42%' : undefined,
            my: isNonMobileScreens ? undefined : '2rem',
          }}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <PostsWidget userId={user._id} />
        </Box>

        {isNonMobileScreens && (
          <Box sx={{ flexBasis: '26%' }}>
            <AdvertWidget />

            <Box sx={{ m: '2rem 0' }} />

            <FriendListWidget userId={user._id} />
          </Box>
        )}
      </Box>
    </Box>
  )
}
export default HomePage
