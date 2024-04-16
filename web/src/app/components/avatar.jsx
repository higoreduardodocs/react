/* eslint-disable react/prop-types */

import { avatarColors } from '../../utils/theme'

export default function Avatar({ userId, username, isOnline }) {
  const userIdBase10 = parseInt(userId, 16)
  const colorIndex = userIdBase10 % avatarColors.length
  const bgColor = avatarColors[colorIndex]

  return (
    <div
      className="w-8 h-8 relative rounded-full flex items-center"
      style={{ background: bgColor }}
    >
      <p className="w-full text-center opacity-70">{username && username[0]}</p>
      <div
        className={`w-3 h-3 absolute bottom-0 right-0 rounded-full border border-white ${
          isOnline ? 'bg-green-500' : 'bg-gray-400'
        }`}
      ></div>
    </div>
  )
}
