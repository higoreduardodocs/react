/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import useChat from '../../hooks/use-chat'
import useUser from '../../hooks/use-user'

export default function Message({ message }) {
  const { user } = useUser()
  const { state: userChat } = useChat()

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [message])

  return (
    <div ref={ref} className={`message ${message?.senderUid === user.uid && 'owner'}`}>
      <div className="message-info">
        <img
          src={
            message?.senderUid === user.uid ? user.photoURL : userChat.user.photoURL
          }
        />
        <span>agora</span>
      </div>
      <div className="message-content">
        <p>{message?.text}</p>
        {message?.image && <img src={message.image} />}
      </div>
    </div>
  )
}
