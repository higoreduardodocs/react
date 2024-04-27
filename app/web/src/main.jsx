import React from 'react'
import ReactDOM from 'react-dom/client'

import AuthProvider from './contexts/auth-context.jsx'
import CartProvider from './contexts/cart-context.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
)
