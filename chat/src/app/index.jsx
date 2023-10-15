import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/home'
import SignIn from './pages/sign-in'
import SignUp from './pages/sign-up'
import './styles/style.scss'

export default function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/cadastro" element={<SignUp />} />
          </Route>
        </Routes>
      </Router>
    </main>
  )
}
