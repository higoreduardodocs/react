import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/header'
import Home from './pages/home'
import Category from './pages/category'
import Product from './pages/product'
import Success from './pages/success'

export default function App() {
  return (
    <main className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Router>
    </main>
  )
}
