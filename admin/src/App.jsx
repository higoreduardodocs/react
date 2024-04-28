import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SignIn from './pages/sign-in'
import ForgotPassword from './pages/forgot-password'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/recuperar-senha" element={<ForgotPassword />} />
      </Routes>
    </Router>
  )
}
