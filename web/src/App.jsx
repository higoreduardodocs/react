import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Ecommerce, Orders } from './pages'
import { useStateContext } from './contexts/context'
import { ConfigButton } from './components'
import { Sidebar, Navbar, ThemeSettings, Footer } from './widgets'

export default function App() {
  const { isSidebar, isSettings, theme } = useStateContext()

  return (
    <main className={`${theme === 'light' ? 'light' : 'dark'}`}>
      <Router>
        <div className="flex relative dark:bg-main-dark-bg bg-gray-200">
          {/* CONFIG BUTTON */}
          <div className="fixed right-10 bottom-10 z-50">
            <ConfigButton />
          </div>

          {/* SIDEBAR */}
          <div
            className={`md:static fixed w-72 z-20 transition-all ${
              isSidebar ? 'left-0' : '-left-72'
            }`}
          >
            <Sidebar />
          </div>

          <div className={`w-screen min-h-screen`}>
            {/* NAVBAR */}
            <div className="w-full">
              <Navbar />
            </div>

            {/* SETTINGS */}
            {isSettings && <ThemeSettings />}

            <Routes>
              <Route path="/" element={<Ecommerce />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>

            {/* FOOTER */}
            <Footer />
          </div>
        </div>
      </Router>
    </main>
  )
}
