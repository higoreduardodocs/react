import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import * as Pages from './pages'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pages.Public.Home />} />
        <Route path="/login" element={<Pages.Public.Login />} />
        <Route path="/product/:id" element={<Pages.Public.Product />} />
        <Route path="/categories" element={<Pages.Public.Categories />} />
        <Route
          path="/category/:slug"
          element={<Pages.Public.CategoryProducts />}
        />
        <Route path="/search/:search" element={<Pages.Public.Search />} />
        <Route path="/cart" element={<Pages.Public.Cart />} />
        <Route
          path="/forgot-password"
          element={<Pages.Public.ForgotPassword />}
        />

        <Route path="/*" element={<Pages.Public.NotFound />} />
      </Routes>
    </Router>
  )
}
