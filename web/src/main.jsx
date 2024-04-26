import React from 'react'
import ReactDOM from 'react-dom/client'

import { ContextProvider } from './contexts/context-provider.jsx'
import App from './App.jsx'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
)
