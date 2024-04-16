import UserContextProvider from '../contexts/user-context'
import Routes from './routes'

export default function App() {
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  )
}
