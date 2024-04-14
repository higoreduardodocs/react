import { useContext } from 'react'

import { AppContext } from '../contexts/app-context'

export default function useApp() {
  return useContext(AppContext)
}
