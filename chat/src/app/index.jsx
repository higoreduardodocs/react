/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import useUser from '../hooks/use-user'
import Home from './pages/home'
import SignIn from './pages/sign-in'
import SignUp from './pages/sign-up'
import './styles/style.scss'

export default function App() {
  const { user } = useUser()

  const ProtectedRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" />
    return children
  }

  return (
    <main>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/cadastro" element={<SignUp />} />
          </Route>
        </Routes>
      </Router>
    </main>
  )
}
