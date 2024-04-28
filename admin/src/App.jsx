import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SignIn from './pages/sign-in'
import ForgotPassword from './pages/forgot-password'
import ResetPassword from './pages/reset-password'

import Layout from './components/layout'
import Dashboard from './pages/dashboard'
import Customers from './pages/customers'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/recuperar-senha" element={<ForgotPassword />} />
        <Route path="/redefinir-senha" element={<ResetPassword />} />

        <Route path="/admin" element={<Layout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="clientes" element={<Customers />} />
        </Route>
      </Routes>
    </Router>
  )
}
