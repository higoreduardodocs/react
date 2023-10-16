/* eslint-disable react/prop-types */
import UserContextProvider from '../contexts/user-context'
import ChatContextProvider from '../contexts/chat-context'

export default function DefaultProviders({ children }) {
  return (
    <UserContextProvider>
      <ChatContextProvider>{children}</ChatContextProvider>
    </UserContextProvider>
  )
}
