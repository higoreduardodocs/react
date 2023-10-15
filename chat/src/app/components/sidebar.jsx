import Chats from './chats'
import Navbar from './navbar'
import Search from './search'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </aside>
  )
}
