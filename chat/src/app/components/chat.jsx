import Input from './input'
import Messages from './messages'

export default function Chat() {
  return (
    <article className="chat">
      <div className="chat-info">
        <span>John Doe</span>
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
