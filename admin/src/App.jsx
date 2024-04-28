import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SignIn from './pages/sign-in'
import ForgotPassword from './pages/forgot-password'
import ResetPassword from './pages/reset-password'

import Layout from './components/layout'
import Dashboard from './pages/dashboard'
import Customers from './pages/customers'
import CatalogProducts from './pages/catalog/products'
import CatalogBrands from './pages/catalog/brands'
import CatalogCategories from './pages/catalog/categories'
import CatalogColors from './pages/catalog/colors'
import Orders from './pages/orders'
import Coupons from './pages/coupons'
import Blogs from './pages/blog/blogs'
import BlogCategories from './pages/blog/categories'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/recuperar-senha" element={<ForgotPassword />} />
        <Route path="/redefinir-senha" element={<ResetPassword />} />

        <Route path="/admin" element={<Layout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="clientes" element={<Customers />} />
          <Route path="produtos" element={<CatalogProducts />} />
          <Route path="marcas" element={<CatalogBrands />} />
          <Route path="categorias" element={<CatalogCategories />} />
          <Route path="cores" element={<CatalogColors />} />
          <Route path="pedidos" element={<Orders />} />
          <Route path="cupons" element={<Coupons />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs-categorias" element={<BlogCategories />} />
        </Route>
      </Routes>
    </Router>
  )
}
