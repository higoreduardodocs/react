import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from './components/layout'
import Home from './pages/home'
import Store from './pages/store'
import Product from './pages/product'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/loja" element={<Store />} />
          <Route path="/produtos/:slug" element={<Product />} />
        </Route>
      </Routes>
    </Router>
  )
}
