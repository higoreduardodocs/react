import { useEffect, useState } from 'react'

import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../libs/firebase'
import useChat from '../../hooks/use-chat'
import Message from './message'

export default function Messages() {
  const { state: userChat } = useChat()
  const [messages, setMessages] = useState([])
  useEffect(() => {
    if (userChat.chatId) {
      const unsub = onSnapshot(doc(db, 'chats', userChat.chatId), (item) => {
        item.exists() && setMessages(item.data().messages)
      })
  
      return () => {
        unsub()
      }
    }
  }, [userChat.chatId])

  return (
    <div className="messages">
      {messages.length !== 0 && messages.map((item, i) => (
        <Message key={i} message={item} />
      ))}
    </div>
  )
}
