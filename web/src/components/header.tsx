import { useState } from 'react'
import { CgProfile } from 'react-icons/cg'

import useAuth from '../hooks/use-auth'
import style from './header.module.css'

const Header = () => {
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <header className={style.header}>
      <div>Logo</div>
      <div className={style.profile} onClick={() => setOpen(!open)}>
        <CgProfile />
        <span>Perfil</span>
        {open && (
          <ul className={style.dropbox}>
            <li>Agendamentos</li>
            <li>Editar perfil</li>
            <li onClick={logout}>Sair</li>
          </ul>
        )}
      </div>
    </header>
  )
}

export default Header
