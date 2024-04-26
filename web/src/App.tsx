import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

import AuthProvider from './contexts/auth-context'
import Login from './pages/login'

export default function App() {
  return (
    <main className="container">
      <ToastContainer />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </main>
  )
}
