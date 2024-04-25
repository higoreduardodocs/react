/* eslint-disable react/prop-types */
import { Box } from '@mui/material'

const UserImage = ({ image, size = '60%' }) => {
  return (
    <Box>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        alt="User"
        src={`${
          import.meta.env.VITE_APP_SERVER_URL
        }/src/public/assets/${image}`}
      />
    </Box>
  )
}
export default UserImage
