/* eslint-disable react/prop-types */
import {
  ShareOutlined,
  FavoriteOutlined,
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useTheme, Typography, IconButton, Box, Divider } from '@mui/material'

import { setPost } from 'src/state'
import WidgetWrapper from 'src/components/WidgetWrapper'
import Friend from 'src/components/Friend'
import FlexBetween from 'src/components/FlexBetween'

const PostWidget = ({
  postId,
  userId,
  fullName,
  location,
  description,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const dispatch = useDispatch()
  const [isComments, setIsComments] = useState(false)
  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)

  const { palette } = useTheme()
  const neutralMain = palette.neutral.main
  const primaryMain = palette.primary.main

  const isLiked = Boolean(likes[_id])
  const likesCount = Object.keys(likes).length

  const patchLike = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_SERVER_URL}/posts/${postId}/like`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: _id }),
      }
    )
    const updatedPost = await response.json()
    dispatch(setPost({ post: updatedPost }))
  }

  return (
    <WidgetWrapper m="2rem 0">
      <>
        <Friend
          friendId={userId}
          userPicturePath={userPicturePath}
          fullName={fullName}
          location={location}
        />

        <Typography sx={{ color: neutralMain, mt: '1rem' }}>
          {description}
        </Typography>

        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="Post"
            style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
            src={`${
              import.meta.env.VITE_APP_SERVER_URL
            }/src/public/assets/${picturePath}`}
          />
        )}

        <FlexBetween mt="0.25rem">
          <>
            <FlexBetween gap="1rem">
              <>
                <FlexBetween gap="0.3rem">
                  <>
                    <IconButton onClick={patchLike}>
                      {isLiked ? (
                        <FavoriteOutlined sx={{ color: primaryMain }} />
                      ) : (
                        <FavoriteBorderOutlined />
                      )}
                    </IconButton>

                    <Typography>{likesCount} likes</Typography>
                  </>
                </FlexBetween>

                <FlexBetween
                  gap="0.3rem"
                  onClick={() => setIsComments(!isComments)}
                >
                  <>
                    <IconButton>
                      <ChatBubbleOutlineOutlined />
                    </IconButton>

                    <Typography>{comments.length} comments</Typography>
                  </>
                </FlexBetween>
              </>
            </FlexBetween>

            <IconButton>
              <ShareOutlined />
            </IconButton>
          </>
        </FlexBetween>

        {isComments && comments.length > 0 && (
          <Box sx={{ mt: '0.5rem' }}>
            {comments?.map((item, i) => (
              <Box key={`${fullName}-${i}`}>
                <Divider />

                <Typography
                  sx={{ color: neutralMain, m: '0.5rem 0', pl: '1rem' }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </>
    </WidgetWrapper>
  )
}
export default PostWidget
