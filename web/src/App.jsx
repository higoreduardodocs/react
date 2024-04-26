import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useStateValue } from './contexts/initial-state'
import { getAllFoodItems } from './utils/firebase'
import { actionType } from './contexts/reducer'
import Header from './components/header'
import Home from './pages/home'
import Create from './pages/create'

export default function App() {
  const [dispatch] = useStateValue()

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      })
    })
  }

  useEffect(() => {
    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      <Router>
        <div className="w-screen h-auto flex flex-col bg-primary">
          <Header />

          <main className="w-screen mt-24 p-8">
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/create" element={<Create />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AnimatePresence>
  )
}
