import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import UserProvider from './contexts/user-context'
import Navbar from './components/navbar'
import Footer from './components/footer'

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
          element: <>Home</>,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
