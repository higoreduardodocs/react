import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SignIn from './pages/sign-in'
import ForgotPassword from './pages/forgot-password'
import ResetPassword from './pages/reset-password'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/recuperar-senha" element={<ForgotPassword />} />
        <Route path="/redefinir-senha" element={<ResetPassword />} />
      </Routes>
    </Router>
  )
}
