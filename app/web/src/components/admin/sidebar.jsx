import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <aside>
      <h4>Admin Panel</h4>
      <NavLink to="/dashboard/admin/categories">Categories</NavLink>
      <NavLink to="/dashboard/admin/products">Products</NavLink>
      <NavLink to="/dashboard/admin/orders">Orders</NavLink>
      <NavLink to="/dashboard/admin/users">Users</NavLink>
    </aside>
  )
}

export default Sidebar
