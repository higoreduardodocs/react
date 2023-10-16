import { useContext } from 'react'

import { ChatContext } from '../app/contexts/chat-context'

export default function useChat() {
  return useContext(ChatContext)
}
