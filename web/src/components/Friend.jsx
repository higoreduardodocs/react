/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTheme, Box, Typography, IconButton } from '@mui/material'
import { PersonRemoveOutlined, PersonAddOutlined } from '@mui/icons-material'

import { setFriends } from 'src/state'
import UserImage from './UserImage'
import FlexBetween from './FlexBetween'

const Friend = ({ friendId, userPicturePath, fullName, location }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { palette } = useTheme()
  const neutralMain = palette.neutral.main
  const primaryDark = palette.primary.dark
  const neutralMedium = palette.neutral.medium
  const primaryLight = palette.primary.light

  const token = useSelector((state) => state.token)
  const { _id } = useSelector((state) => state.user)
  const isMine = _id === friendId
  const friends = useSelector((state) => state.user.friends)
  const isFriend = friends.find((item) => item._id === friendId)

  const patchFriend = async () => {
    await fetch(
      `${import.meta.env.VITE_APP_SERVER_URL}/users/${_id}/${friendId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => dispatch(setFriends({ friends: data })))
      .catch((err) => console.log(err))
  }

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />

        <Box>
          <Typography
            onClick={() => {
              navigate(`/profile/${friendId}`)
              navigate(0)
            }}
            sx={{
              color: neutralMain,
              '&:hover': { color: primaryDark, cursor: 'pointer' },
            }}
          >
            {fullName}
          </Typography>

          <Typography sx={{ color: neutralMedium }}>{location}</Typography>
        </Box>
      </FlexBetween>

      {!isMine && (
        <IconButton
          sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
          onClick={patchFriend}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  )
}
export default Friend
