import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Box, useMediaQuery } from '@mui/material'

import Navbar from 'src/scenes/navbar'
import UserWidget from 'src/widgets/UserWidget'
import FriendListWidget from 'src/widgets/FriendListWidget'
import MyPostWidget from 'src/widgets/MyPostWidget'
import PostsWidget from 'src/widgets/PostsWidget'

const ProfilePage = () => {
  const token = useSelector((state) => state.token)
  const myUser = useSelector((state) => state.user)
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')

  const getUser = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_SERVER_URL}/users/${userId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const data = await response.json()
    setUser(data)
  }

  useEffect(() => {
    getUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null

  return (
    <Box>
      <Navbar />

      <Box
        sx={{
          width: '100%',
          padding: '2rem 6%',
          display: isNonMobileScreens ? 'flex' : 'block',
          gap: '2rem',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ flexBasis: isNonMobileScreens ? '40%' : undefined }}>
          <UserWidget userId={user._id} picturePath={user.picturePath} />

          <Box sx={{ m: '2rem 0' }} />

          <FriendListWidget userId={user._id} />
        </Box>

        <Box>
          <MyPostWidget picturePath={myUser.picturePath} />

          <Box sx={{ m: '2rem 0' }} />

          <PostsWidget userId={user._id} isProfile />
        </Box>
      </Box>
    </Box>
  )
}
export default ProfilePage
