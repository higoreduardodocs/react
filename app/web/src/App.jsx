import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import * as RouteWrapper from './routes'
import * as Pages from './pages'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pages.Public.Home />} />
        <Route path="/login" element={<Pages.Public.Login />} />
        <Route path="/product/:id" element={<Pages.Public.Product />} />
        <Route path="/categories" element={<Pages.Public.Categories />} />
        <Route
          path="/category/:slug"
          element={<Pages.Public.CategoryProducts />}
        />
        <Route path="/search/:search" element={<Pages.Public.Search />} />
        <Route path="/cart" element={<Pages.Public.Cart />} />
        <Route
          path="/forgot-password"
          element={<Pages.Public.ForgotPassword />}
        />

        <Route path="/dashboard" element={<RouteWrapper.Admin />}>
          <Route path="admin" element={<Pages.Admin.Dashboard />} />
          <Route path="admin/categories" element={<Pages.Admin.Categories />} />
          <Route path="admin/products" element={<Pages.Admin.Products />} />
          <Route path="admin/orders" element={<Pages.Admin.Orders />} />
          <Route path="admin/users" element={<Pages.Admin.Users />} />
        </Route>

        <Route path="/dashboard" element={<RouteWrapper.Auth />}>
          <Route path="auth" element={<Pages.Auth.Dashboard />} />
          <Route path="auth/orders" element={<Pages.Auth.Orders />} />
        </Route>

        <Route path="/*" element={<Pages.Public.NotFound />} />
      </Routes>
    </Router>
  )
}
