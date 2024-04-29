import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from './components/layout'
import Home from './pages/home'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}
