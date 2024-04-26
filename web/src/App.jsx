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
import GigId from './pages/gig-id'
import GigsPortfolio from './pages/gigs-portfolio'
import Payment from './pages/payment'
import Success from './pages/success'
import GigsOrder from './pages/gigs-order'
import Messages from './pages/messages'
import MessagesId from './pages/messages-id'

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
        {
          path: '/gigs/:id',
          element: <GigId />,
        },
        {
          path: '/my-gigs',
          element: <GigsPortfolio />,
        },
        {
          path: '/payment/:gigId',
          element: <Payment />,
        },
        {
          path: '/success',
          element: <Success />,
        },
        {
          path: '/orders',
          element: <GigsOrder />,
        },
        {
          path: '/messages',
          element: <Messages />,
        },
        {
          path: '/messages/:id',
          element: <MessagesId />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}
