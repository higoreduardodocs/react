import React from 'react'
import ReactDOM from 'react-dom/client'

import DefaultProviders from './providers/default-provider.tsx'
import App from './app/index.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DefaultProviders>
      <App />
    </DefaultProviders>
  </React.StrictMode>
)
