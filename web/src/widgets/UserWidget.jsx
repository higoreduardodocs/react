/* eslint-disable react/prop-types */
import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  EditOutlined,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTheme, Box, Typography, Divider } from '@mui/material'

import WidgetWrapper from 'src/components/WidgetWrapper'
import FlexBetween from 'src/components/FlexBetween'
import UserImage from 'src/components/UserImage'
import Twitter from 'src/assets/twitter.png'
import Linkedin from 'src/assets/linkedin.png'

const UserWidget = ({ userId, picturePath }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const token = useSelector((state) => state.token)

  const { palette } = useTheme()
  const neutralDark = palette.neutral.dark
  const primaryLight = palette.primary.light
  const neutralMedium = palette.neutral.medium
  const neutralMain = palette.neutral.main

  const getUser = async () => {
    fetch(`${import.meta.env.VITE_APP_SERVER_URL}/users/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null

  const {
    firstName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <Box sx={{ flexBasis: '30%' }}>
          <UserImage image={picturePath} />
        </Box>

        <Box sx={{ flexBasis: '50%' }}>
          <Typography
            variant="h4"
            sx={{
              color: neutralDark,
              fontWeight: '500',
              '&:hover': { color: primaryLight, cursor: 'pointer' },
            }}
          >
            {firstName}
          </Typography>

          <Typography sx={{ color: neutralMedium }}>
            {friends.length} friends
          </Typography>
        </Box>

        <ManageAccountsOutlined sx={{ flexBasis: '10%' }} />
      </FlexBetween>

      <Divider />

      <Box sx={{ p: '1rem 0' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            mb: '0.5rem',
          }}
        >
          <LocationOnOutlined sx={{ fontSize: 'large', color: neutralMain }} />
          <Typography sx={{ color: neutralMedium }}>{location}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <WorkOutlineOutlined sx={{ fontSize: 'large', color: neutralMain }} />
          <Typography sx={{ color: neutralMedium }}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ p: '1rem 0' }}>
        <FlexBetween mb="0.5rem">
          <Typography sx={{ color: neutralMedium }}>
            Whos viewed your profile
          </Typography>
          <Typography sx={{ color: neutralMain, fontWeight: '500' }}>
            {viewedProfile}
          </Typography>
        </FlexBetween>

        <FlexBetween>
          <Typography sx={{ color: neutralMedium }}>
            Impression of your post
          </Typography>
          <Typography sx={{ color: neutralMain, fontWeight: '500' }}>
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      <Box sx={{ p: '1rem 0' }}>
        <Typography
          sx={{
            fontSize: '1rem',
            color: neutralMain,
            fontWeight: '500',
            mb: '1rem',
          }}
        >
          Social profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src={Twitter} alt="Twitter" />

            <Box>
              <Typography sx={{ color: neutralMain, fontWeight: '500' }}>
                Twitter
              </Typography>
              <Typography>Social Network</Typography>
            </Box>
          </FlexBetween>

          <EditOutlined sx={{ color: neutralMain }} />
        </FlexBetween>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src={Linkedin} alt="Linkedin" />

            <Box>
              <Typography sx={{ color: neutralMain, fontWeight: '500' }}>
                Linkedin
              </Typography>
              <Typography>Network Platform</Typography>
            </Box>
          </FlexBetween>

          <EditOutlined sx={{ color: neutralMain }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  )
}
export default UserWidget
