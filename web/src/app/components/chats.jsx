import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'

import useUser from '../../hooks/use-user'
import { db } from '../../libs/firebase'
import useChat from '../../hooks/use-chat'

export default function Chats() {
  const { user } = useUser()
  const { state: userChat, dispatch } = useChat()
  const [chats, setChats] = useState([])

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', user.uid), (item) => {
        setChats(item.data())
      })
      return () => {
        unsub()
      }
    }
    user.uid && getChats()
  }, [user.uid])
  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user })
  }

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((item, i) => (
        <div key={i} className={`user-chat ${userChat && item[1]?.userInfo?.uid === userChat?.user?.uid && 'selected'}`} onClick={() => handleSelect(item[1].userInfo)}>
          <img src={item[1]?.userInfo?.photoURL} alt={item[1]?.userInfo?.displayName} />
          <div className="user-info">
            <span>{item[1]?.userInfo?.displayName}</span>
            <p>{item[1]?.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
