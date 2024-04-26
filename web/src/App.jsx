import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import UserProvider from './contexts/user-context'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Gigs from './pages/gigs'
import GigsAdd from './pages/gigs-add'

const Layout = () => {
  const queryClient = new QueryClient()

  return (
    <main className="app">
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </UserProvider>
    </main>
  )
}

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/gigs',
          element: <Gigs />,
        },
        {
          path: '/create-gig',
          element: <GigsAdd />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
