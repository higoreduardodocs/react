/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react'
import useUser from '../../hooks/use-user'

export const ChatContext = createContext()

export default function ChatContextProvider({ children }) {
  const { user } = useUser()
  const chatReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          chatId:
            user.uid > action.payload.uid
              ? user.uid + action.payload.uid
              : action.payload.uid + user.uid,
          user: action.payload,
        }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(chatReducer, {
    chatId: null,
    user: null,
  })

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
