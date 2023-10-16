import useChat from '../../hooks/use-chat'
import Messages from './messages'
import Input from './input'

export default function Chat() {
  const { state: userChat } = useChat()

  return (
    <article className="chat">
      <div className="chat-info">
        <span>{userChat.user?.displayName}</span>
        <div className="chat-icons">
          <img src="/camera-icon.png" alt="Chamada de vídeo" />
          <img src="/add-icon.png" alt="Adicionar aos contatos" />
          <img src="/more-icon.png" alt="Mais informações" />
        </div>
      </div>
      <Messages />
      <Input />
    </article>
  )
}
