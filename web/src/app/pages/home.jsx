import Chat from '../components/chat'
import Sidebar from '../components/sidebar'

export default function Home() {
  return (
    <section className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </section>
  )
}
