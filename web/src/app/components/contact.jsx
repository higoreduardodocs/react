/* eslint-disable react/prop-types */

import Avatar from './avatar'

export default function Contact({
  userId,
  username,
  selectedUserId,
  setSelectedUserId,
  isOnline,
}) {
  return (
    <div
      onClick={() => setSelectedUserId(userId)}
      className={`flex border-b border-gray-100 cursor-pointer ${
        selectedUserId === userId ? 'bg-blue-50' : ''
      }`}
    >
      {selectedUserId === userId && (
        <div className="bg-blue-500 w-1 h-12 rounded-r-md"></div>
      )}
      <div className="flex items-center gap-2 p-2">
        <Avatar userId={userId} username={username} isOnline={isOnline} />
        <span className="text-gray-800">{username}</span>
      </div>
    </div>
  )
}
