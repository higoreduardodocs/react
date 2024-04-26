import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/header'

export default function App() {
  return (
    <main className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<>Home</>} />
        </Routes>
      </Router>
    </main>
  )
}
