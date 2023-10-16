import { signOut } from 'firebase/auth'

import { auth } from '../../libs/firebase'
import useUser from '../../hooks/use-user'

export default function Navbar() {
  const { user } = useUser()

  return (
    <nav className="navbar">
      <span className="logo">Chat App</span>
      <div className="user-profile">
        <img src={user.photoURL} alt={user.displayName} />
        <span>{user.displayName}</span>
        <button type="button" onClick={() => signOut(auth)}>Sair</button>
      </div>
    </nav>
  )
}