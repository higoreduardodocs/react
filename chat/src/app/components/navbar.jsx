export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="logo">Chat App</span>
      <div className="user-profile">
        <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" />
        <span>John Doe</span>
        <button type="button">Sair</button>
      </div>
    </nav>
  )
}