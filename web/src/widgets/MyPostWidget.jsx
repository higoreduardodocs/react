/* eslint-disable react/prop-types */

import {
  useTheme,
  InputBase,
  Divider,
  Typography,
  Button,
  Box,
  useMediaQuery,
  IconButton,
} from '@mui/material'
import {
  ImageOutlined,
  GifBoxOutlined,
  AttachFileOutlined,
  MicOutlined,
  MoreHorizOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@mui/icons-material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Dropzone from 'react-dropzone'

import { setPosts } from 'src/state'
import WidgetWrapper from 'src/components/WidgetWrapper'
import FlexBetween from 'src/components/FlexBetween'
import UserImage from 'src/components/UserImage'

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch()
  const [post, setPost] = useState('')
  const [image, setImage] = useState(null)
  const [isImage, setIsImage] = useState(false)
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')
  const { _id } = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)

  const { palette } = useTheme()
  const neutralLight = palette.neutral.light
  const neutralMediumMain = palette.neutral.mediumMain
  const backgroundAlt = palette.background.alt
  const primaryMain = palette.primary.main
  const neutralMedium = palette.neutral.medium

  const handlePost = async () => {
    if (!post) return

    const formData = new FormData()
    formData.append('userId', _id)
    formData.append('description', post)
    if (image) {
      formData.append('picture', image)
      formData.append('picturePath', image.name)
    }

    await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/posts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setPosts({ posts: data }))
        setImage(null)
        setIsImage(false)
        setPost('')
      })
      .catch((err) => console.log(err))
  }

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <Box sx={{ flexBasis: '25%' }}>
          <UserImage image={picturePath} />
        </Box>

        <InputBase
          placeholder="What's on your mind..."
          value={post}
          onChange={(e) => setPost(e.target.value)}
          sx={{
            width: '100%',
            backgroundColor: neutralLight,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
      </FlexBetween>

      <Divider sx={{ margin: '1.25rem 0' }} />

      {isImage && (
        <Box
          sx={{
            border: `1px solid ${neutralMedium}`,
            borderRadius: '5px',
            my: '1rem',
            p: '1rem',
          }}
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  sx={{
                    border: `2px dashed ${primaryMain}`,
                    p: '1rem',
                    width: '100%',
                    '&:hover': { cursor: 'pointer' },
                  }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <FlexBetween justifyContent="center" gap="0.25rem">
                      <ImageOutlined />
                      <Typography>Add Image Here</Typography>
                    </FlexBetween>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>

                {image && (
                  <IconButton
                    sx={{ width: '15%' }}
                    onClick={() => setImage(null)}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: neutralMediumMain }} />
          <Typography sx={{ color: neutralMediumMain }}>Image</Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: neutralMediumMain }} />
              <Typography sx={{ color: neutralMediumMain }}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: neutralMediumMain }} />
              <Typography sx={{ color: neutralMediumMain }}>
                Attachment
              </Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: neutralMediumMain }} />
              <Typography sx={{ color: neutralMediumMain }}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: neutralMediumMain }} />
          </FlexBetween>
        )}

        <Button
          onClick={handlePost}
          sx={{
            color: backgroundAlt,
            backgroundColor: primaryMain,
            borderRadius: '3rem',
            '&:hover': { color: primaryMain },
          }}
        >
          Post
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  )
}
export default MyPostWidget
