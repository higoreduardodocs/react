import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <aside>
      <h4>Dashboard</h4>
      <NavLink to="/dashboard/auth/orders">Orders</NavLink>
    </aside>
  )
}

export default Sidebar
