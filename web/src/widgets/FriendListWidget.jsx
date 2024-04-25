/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, useTheme } from '@mui/material'

import { setFriends } from 'src/state'
import WidgetWrapper from 'src/components/WidgetWrapper'
import Friend from 'src/components/Friend'

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch()
  const friends = useSelector((state) => state.user.friends)
  const token = useSelector((state) => state.token)

  const { palette } = useTheme()
  const neutralDark = palette.neutral.dark

  const getFriends = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_SERVER_URL}/users/${userId}/friends`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const data = await response.json()
    dispatch(setFriends({ friends: data }))
  }

  useEffect(() => {
    getFriends()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        variant="h5"
        sx={{ color: neutralDark, fontWeight: '500', mb: '1.5rem' }}
      >
        Friend List
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {friends?.map((item) => (
          <Friend
            key={item._id}
            friendId={item._id}
            userPicturePath={item.picturePath}
            fullName={`${item.firstName} ${item.lastName}`}
            location={item.location}
          />
        ))}
      </Box>
    </WidgetWrapper>
  )
}
export default FriendListWidget
