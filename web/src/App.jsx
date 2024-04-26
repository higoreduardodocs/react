import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/header'
import Home from './pages/home'
import Category from './pages/home/category'

export default function App() {
  return (
    <main className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<Category />} />
        </Routes>
      </Router>
    </main>
  )
}
