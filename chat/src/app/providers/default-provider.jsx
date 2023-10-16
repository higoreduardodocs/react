/* eslint-disable react/prop-types */
import UserContextProvider from '../contexts/user-context'

export default function DefaultProviders({ children }) {
  return <UserContextProvider>{children}</UserContextProvider>
}
