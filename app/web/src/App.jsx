import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import * as Pages from './pages'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pages.Public.Home />} />
      </Routes>
    </Router>
  )
}
