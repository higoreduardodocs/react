/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { setPosts } from 'src/state'
import PostWidget from './PostWidget'

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const posts = useSelector((state) => state.posts)

  const getFeedPosts = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_SERVER_URL}/posts`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const data = await response.json()
    dispatch(setPosts({ posts: data }))
  }

  const getUserPosts = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_SERVER_URL}/posts/${userId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const data = await response.json()
    dispatch(setPosts({ posts: data }))
  }

  useEffect(() => {
    if (isProfile) getUserPosts()
    else getFeedPosts()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts?.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          location,
          description,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            userId={userId}
            fullName={`${firstName} ${lastName}`}
            location={location}
            description={description}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  )
}
export default PostsWidget
