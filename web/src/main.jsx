import React from 'react'
import ReactDOM from 'react-dom/client'

import { StateProvider } from './contexts/state-provider.jsx'
import { initialState } from './contexts/initial-state.js'
import reducer from './contexts/reducer.js'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={initialState}>
      <App />
    </StateProvider>
  </React.StrictMode>
)
