import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from './components/layout'
import Home from './pages/home'
import Store from './pages/store'
import Product from './pages/product'
import Cart from './pages/cart'
import Checkout from './pages/checkout'
import Compare from './pages/compare'
import SignIn from './pages/sign-in'
import SignUp from './pages/sign-up'
import Wishlist from './pages/wishlist'
import Blogs from './pages/blogs'
import Blog from './pages/blog'
import ForgotPassword from './pages/forgot-password'
import ResetPassword from './pages/reset-password'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/loja" element={<Store />} />
          <Route path="/produtos/:slug" element={<Product />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/finalizar-compra" element={<Checkout />} />
          <Route path="/comparar" element={<Compare />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/criar-conta" element={<SignUp />} />
          <Route path="/favoritos" element={<Wishlist />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<Blog />} />
          <Route path="/recuperar-senha" element={<ForgotPassword />} />
          <Route path="/redefinir-senha" element={<ResetPassword />} />
        </Route>
      </Routes>
    </Router>
  )
}
